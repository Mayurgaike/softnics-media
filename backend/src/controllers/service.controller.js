const { Op } = require("sequelize");
const db = require("../models");
const { Service, ServiceOffering } = db;
const makeUrl = require("../utils/fileUrl");
const {
  sanitizeRichText,
  validateAndSanitizeHeaderCode,
  formatSlug,
  isValidSlug
} = require("../utils/sanitize");
const { deleteUploadedFile } = require("../config/upload");

/**
 * Public: GET /api/services
 * Returns all published services.
 */
exports.getAll = async (req, res) => {
  try {
    const services = await Service.findAll({
      where: { status: "published" },
      include: [{ model: ServiceOffering, as: "offerings" }],
      order: [["id", "ASC"]],
    });

    res.json(
      services.map((s) => ({
        ...s.toJSON(),
        icon: makeUrl(s.icon),
        // image is ONLY the new CMS-uploaded hero image; never fall back to icon
        image: makeUrl(s.image),
      }))
    );
  } catch (err) {
    console.error("Failed to fetch public services:", err);
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

/**
 * Public: GET /api/services/:slug
 * Returns one published service by slug.
 */
exports.getOne = async (req, res) => {
  try {
    const service = await Service.findOne({
      where: {
        slug: req.params.slug,
        status: "published",
      },
      include: [{ model: ServiceOffering, as: "offerings" }],
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({
      ...service.toJSON(),
      icon: makeUrl(service.icon),
      // image is ONLY the new CMS-uploaded hero image; never fall back to icon
      image: makeUrl(service.image),
    });
  } catch (err) {
    console.error("Failed to fetch public service:", err);
    res.status(500).json({ message: "Failed to fetch service" });
  }
};

/**
 * Admin: GET /api/admin/services
 * Returns all services (published and drafts), with search and pagination.
 */
exports.adminGetAll = async (req, res) => {
  try {
    const { q, status, page, limit } = req.query;
    const where = {};

    if (status && (status === "published" || status === "draft")) {
      where.status = status;
    }

    if (q && q.trim()) {
      where[Op.or] = [
        { title: { [Op.like]: `%${q.trim()}%` } },
        { slug: { [Op.like]: `%${q.trim()}%` } },
        { description: { [Op.like]: `%${q.trim()}%` } },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await Service.findAndCountAll({
      where,
      include: [{ model: ServiceOffering, as: "offerings" }],
      order: [["id", "DESC"]],
      limit: pageSize,
      offset,
      distinct: true,
    });

    res.json({
      total: count,
      page: pageNum,
      totalPages: Math.ceil(count / pageSize),
      services: rows.map((s) => ({
        ...s.toJSON(),
        icon: makeUrl(s.icon),
        // image is ONLY the new CMS-uploaded hero image; never fall back to icon
        image: makeUrl(s.image),
      })),
    });
  } catch (err) {
    console.error("Admin fetch services failed:", err);
    res.status(500).json({ message: "Failed to fetch admin services" });
  }
};

/**
 * Admin: GET /api/admin/services/:id
 * Returns a specific service by ID for editing (published or draft).
 */
exports.adminGetById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id, {
      include: [{ model: ServiceOffering, as: "offerings" }],
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({
      ...service.toJSON(),
      icon: makeUrl(service.icon),
      // image is ONLY the new CMS-uploaded hero image; never fall back to icon
      image: makeUrl(service.image),
      rawImage: service.image,
      rawIcon: service.icon,
    });
  } catch (err) {
    console.error("Admin get service by ID failed:", err);
    res.status(500).json({ message: "Failed to fetch service" });
  }
};

/**
 * Admin: POST /api/admin/services or /api/services
 * Create a new service.
 */
exports.create = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const body = req.body || {};

    // Validate title
    if (!body.title || !body.title.trim()) {
      await transaction.rollback();
      return res.status(400).json({ message: "Page Title is required" });
    }

    // Validate and format slug
    let rawSlug = body.slug ? body.slug.trim() : formatSlug(body.title);
    const slug = formatSlug(rawSlug);
    if (!slug || !isValidSlug(slug)) {
      await transaction.rollback();
      return res.status(400).json({ message: "Invalid URL slug format" });
    }

    // Enforce unique slug
    const existing = await Service.findOne({ where: { slug }, transaction });
    if (existing) {
      await transaction.rollback();
      return res.status(409).json({
        message: `Slug '${slug}' is already in use. Please provide a unique slug.`
      });
    }

    // Parse offerings if provided
    let offerings = [];
    if (body.offerings) {
      try {
        offerings = typeof body.offerings === "string" ? JSON.parse(body.offerings) : body.offerings;
      } catch (e) {
        offerings = [];
      }
    }

    const imagePath = req.file ? `services/${req.file.filename}` : null;

    const service = await Service.create(
      {
        title: body.title.trim(),
        slug,
        content: sanitizeRichText(body.content || ""),
        description: body.description || "",
        intro: body.intro || "",
        closing: body.closing || "",
        status: body.status === "draft" ? "draft" : "published",
        image: imagePath,
        icon: imagePath || body.icon || null,
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
        metaKeywords: body.metaKeywords || null,
        ogTitle: body.ogTitle || null,
        ogDescription: body.ogDescription || null,
        twitterTitle: body.twitterTitle || null,
        twitterDescription: body.twitterDescription || null,
        schemaCode: body.schemaCode || null,
        canonicalUrl: body.canonicalUrl || null,
        customHeaderCode: validateAndSanitizeHeaderCode(body.customHeaderCode || ""),
      },
      { transaction }
    );

    if (Array.isArray(offerings) && offerings.length > 0) {
      await ServiceOffering.bulkCreate(
        offerings.map((text, index) => ({
          serviceId: service.id,
          text: typeof text === "object" ? text.text : text,
          order: index,
        })),
        { transaction }
      );
    }

    await transaction.commit();

    const created = await Service.findByPk(service.id, {
      include: [{ model: ServiceOffering, as: "offerings" }],
    });

    res.status(201).json({
      ...created.toJSON(),
      icon: makeUrl(created.icon),
      image: makeUrl(created.image),
    });
  } catch (err) {
    await transaction.rollback();
    console.error("Create service failed:", err);
    res.status(500).json({ message: "Failed to create service: " + err.message });
  }
};

/**
 * Admin: PUT /api/admin/services/:id or /api/services/:id
 * Update an existing service.
 */
exports.update = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;
    const body = req.body || {};

    const existing = await Service.findByPk(id, { transaction });
    if (!existing) {
      await transaction.rollback();
      return res.status(404).json({ message: "Service not found" });
    }

    const updates = {};

    // Validate title if provided
    if (body.title !== undefined) {
      if (!body.title.trim()) {
        await transaction.rollback();
        return res.status(400).json({ message: "Page Title cannot be empty" });
      }
      updates.title = body.title.trim();
    }

    // Validate slug if provided
    if (body.slug !== undefined) {
      const slug = formatSlug(body.slug);
      if (!slug || !isValidSlug(slug)) {
        await transaction.rollback();
        return res.status(400).json({ message: "Invalid URL slug format" });
      }

      // Check unique slug conflict with other records
      const duplicate = await Service.findOne({
        where: {
          slug,
          id: { [Op.ne]: id },
        },
        transaction,
      });

      if (duplicate) {
        await transaction.rollback();
        return res.status(409).json({
          message: `Slug '${slug}' is already in use by another service.`
        });
      }

      updates.slug = slug;
    }

    // Sanitize rich text content if provided
    if (body.content !== undefined) {
      updates.content = sanitizeRichText(body.content);
    }

    if (body.description !== undefined) updates.description = body.description;
    if (body.intro !== undefined) updates.intro = body.intro;
    if (body.closing !== undefined) updates.closing = body.closing;
    if (body.status !== undefined) {
      updates.status = body.status === "draft" ? "draft" : "published";
    }

    // SEO fields
    if (body.metaTitle !== undefined) updates.metaTitle = body.metaTitle || null;
    if (body.metaDescription !== undefined) updates.metaDescription = body.metaDescription || null;
    if (body.metaKeywords !== undefined) updates.metaKeywords = body.metaKeywords || null;
    if (body.ogTitle !== undefined) updates.ogTitle = body.ogTitle || null;
    if (body.ogDescription !== undefined) updates.ogDescription = body.ogDescription || null;
    if (body.twitterTitle !== undefined) updates.twitterTitle = body.twitterTitle || null;
    if (body.twitterDescription !== undefined) updates.twitterDescription = body.twitterDescription || null;
    if (body.schemaCode !== undefined) updates.schemaCode = body.schemaCode || null;
    if (body.canonicalUrl !== undefined) updates.canonicalUrl = body.canonicalUrl || null;

    if (body.customHeaderCode !== undefined) {
      updates.customHeaderCode = validateAndSanitizeHeaderCode(body.customHeaderCode || "");
    }

    // Image upload and safe file replacement
    let oldImageToDelete = null;
    if (req.file) {
      const newPath = `services/${req.file.filename}`;
      updates.image = newPath;
      updates.icon = newPath;
      if (existing.image) oldImageToDelete = existing.image;
    }

    await Service.update(updates, { where: { id }, transaction });

    // Update offerings if provided
    if (body.offerings !== undefined) {
      let offerings = [];
      try {
        offerings = typeof body.offerings === "string" ? JSON.parse(body.offerings) : body.offerings;
      } catch (e) {
        offerings = [];
      }

      if (Array.isArray(offerings)) {
        await ServiceOffering.destroy({ where: { serviceId: id }, transaction });
        if (offerings.length > 0) {
          await ServiceOffering.bulkCreate(
            offerings.map((item, index) => ({
              serviceId: id,
              text: typeof item === "object" ? item.text : item,
              order: index,
            })),
            { transaction }
          );
        }
      }
    }

    await transaction.commit();

    // After successful commit, safely delete replaced file from disk
    if (oldImageToDelete) {
      deleteUploadedFile(oldImageToDelete);
    }

    const updated = await Service.findByPk(id, {
      include: [{ model: ServiceOffering, as: "offerings" }],
    });

    res.json({
      message: "Service updated successfully",
      service: {
        ...updated.toJSON(),
        icon: makeUrl(updated.icon),
        image: makeUrl(updated.image),
      },
    });
  } catch (err) {
    await transaction.rollback();
    console.error("Update service failed:", err);
    res.status(500).json({ message: "Failed to update service: " + err.message });
  }
};

/**
 * Admin: DELETE /api/admin/services/:id or /api/services/:id
 * Soft deletes the service.
 */
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await Service.destroy({ where: { id } });
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error("Delete service failed:", err);
    res.status(500).json({ message: "Failed to delete service" });
  }
};

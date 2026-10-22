const { Op } = require("sequelize");
const db = require("../models");
const { Blog, BlogBlock } = db;
const makeUrl = require("../utils/fileUrl");
const {
  sanitizeRichText,
  validateAndSanitizeHeaderCode,
  formatSlug,
  isValidSlug
} = require("../utils/sanitize");
const { deleteUploadedFile } = require("../config/upload");

/**
 * Public: GET /api/blogs
 * Returns all published blogs.
 */
exports.getAll = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { status: "published" },
      order: [["id", "DESC"]],
    });

    res.json(
      blogs.map((b) => ({
        ...b.toJSON(),
        image: makeUrl(b.image),
      }))
    );
  } catch (err) {
    console.error("Public blogs fetch failed:", err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

/**
 * Public: GET /api/blogs/:slug
 * Returns one published blog by slug.
 * Preserves legacy contentBlocks as fallback for seeded/existing blogs.
 */
exports.getOne = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: {
        slug: req.params.slug,
        status: "published",
      },
      include: [{ model: BlogBlock, as: "contentBlocks", order: [["order", "ASC"]] }],
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const data = blog.toJSON();

    // If blog has rich text content string in DB, use it;
    // If rich content is empty but legacy contentBlocks exist, provide contentBlocks under both content and contentBlocks
    const legacyBlocks = data.contentBlocks || [];
    const richContent = data.content || null;

    res.json({
      ...data,
      content: richContent || legacyBlocks,
      contentBlocks: legacyBlocks,
      image: makeUrl(data.image),
    });
  } catch (err) {
    console.error("Public blog fetch failed:", err);
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};

/**
 * Admin: GET /api/admin/blogs
 * Returns all blogs (published and drafts), with search and pagination.
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
        { shortDesc: { [Op.like]: `%${q.trim()}%` } },
        { author: { [Op.like]: `%${q.trim()}%` } },
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await Blog.findAndCountAll({
      where,
      order: [["id", "DESC"]],
      limit: pageSize,
      offset,
    });

    res.json({
      total: count,
      page: pageNum,
      totalPages: Math.ceil(count / pageSize),
      blogs: rows.map((b) => ({
        ...b.toJSON(),
        image: makeUrl(b.image),
      })),
    });
  } catch (err) {
    console.error("Admin fetch blogs failed:", err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

/**
 * Admin: GET /api/admin/blogs/:id
 * Returns a specific blog by ID for editing.
 */
exports.adminGetById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: [{ model: BlogBlock, as: "contentBlocks", order: [["order", "ASC"]] }],
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const data = blog.toJSON();
    res.json({
      ...data,
      content: data.content || "",
      contentBlocks: data.contentBlocks || [],
      image: makeUrl(data.image),
      rawImage: data.image,
    });
  } catch (err) {
    console.error("Admin get blog by ID failed:", err);
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};

/**
 * Admin: POST /api/admin/blogs or /api/blogs
 * Create a new blog post.
 */
exports.create = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const body = req.body || {};

    if (!body.title || !body.title.trim()) {
      await transaction.rollback();
      return res.status(400).json({ message: "Blog Title is required" });
    }

    let rawSlug = body.slug ? body.slug.trim() : formatSlug(body.title);
    const slug = formatSlug(rawSlug);
    if (!slug || !isValidSlug(slug)) {
      await transaction.rollback();
      return res.status(400).json({ message: "Invalid URL slug format" });
    }

    const existing = await Blog.findOne({ where: { slug }, transaction });
    if (existing) {
      await transaction.rollback();
      return res.status(409).json({
        message: `Slug '${slug}' is already in use. Please provide a unique slug.`
      });
    }

    const imagePath = req.file ? `blogs/${req.file.filename}` : null;
    const isDraft = body.status === "draft";

    let rawContent = body.content || "";
    // If content was sent as legacy JSON blocks array
    let legacyBlocks = null;
    if (typeof rawContent === "string" && (rawContent.startsWith("[") || rawContent.startsWith("{"))) {
      try {
        const parsed = JSON.parse(rawContent);
        if (Array.isArray(parsed)) {
          legacyBlocks = parsed;
          rawContent = "";
        }
      } catch (e) {
        // Not JSON, treat as raw HTML string
      }
    } else if (Array.isArray(rawContent)) {
      legacyBlocks = rawContent;
      rawContent = "";
    }

    const sanitizedHtml = sanitizeRichText(rawContent);

    const blog = await Blog.create(
      {
        title: body.title.trim(),
        slug,
        content: sanitizedHtml,
        image: imagePath,
        status: isDraft ? "draft" : "published",
        author: body.author ? body.author.trim() : null,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : (isDraft ? null : new Date()),
        date: body.date || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        readTime: body.readTime || "5 min read",
        shortDesc: body.shortDesc || "",
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

    // Save legacy blocks if provided
    if (Array.isArray(legacyBlocks) && legacyBlocks.length > 0) {
      await BlogBlock.bulkCreate(
        legacyBlocks.map((b, index) => ({
          blogId: blog.id,
          type: b.type,
          text: b.text || null,
          items: b.items || null,
          order: index,
        })),
        { transaction }
      );
    }

    await transaction.commit();

    const created = await Blog.findByPk(blog.id, {
      include: [{ model: BlogBlock, as: "contentBlocks" }],
    });

    res.status(201).json({
      ...created.toJSON(),
      image: makeUrl(created.image),
    });
  } catch (err) {
    await transaction.rollback();
    console.error("Create blog failed:", err);
    res.status(500).json({ message: "Failed to create blog: " + err.message });
  }
};

/**
 * Admin: PUT /api/admin/blogs/:id or /api/blogs/:id
 * Update an existing blog.
 */
exports.update = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;
    const body = req.body || {};

    const existing = await Blog.findByPk(id, { transaction });
    if (!existing) {
      await transaction.rollback();
      return res.status(404).json({ message: "Blog not found" });
    }

    const updates = {};

    if (body.title !== undefined) {
      if (!body.title.trim()) {
        await transaction.rollback();
        return res.status(400).json({ message: "Blog Title cannot be empty" });
      }
      updates.title = body.title.trim();
    }

    if (body.slug !== undefined) {
      const slug = formatSlug(body.slug);
      if (!slug || !isValidSlug(slug)) {
        await transaction.rollback();
        return res.status(400).json({ message: "Invalid URL slug format" });
      }

      const duplicate = await Blog.findOne({
        where: {
          slug,
          id: { [Op.ne]: id },
        },
        transaction,
      });

      if (duplicate) {
        await transaction.rollback();
        return res.status(409).json({
          message: `Slug '${slug}' is already in use by another blog.`
        });
      }

      updates.slug = slug;
    }

    // Rich text vs legacy blocks
    let legacyBlocks = null;
    if (body.content !== undefined) {
      let rawContent = body.content;
      if (typeof rawContent === "string" && (rawContent.startsWith("[") || rawContent.startsWith("{"))) {
        try {
          const parsed = JSON.parse(rawContent);
          if (Array.isArray(parsed)) {
            legacyBlocks = parsed;
            rawContent = "";
          }
        } catch (e) {
          // treat as string
        }
      } else if (Array.isArray(rawContent)) {
        legacyBlocks = rawContent;
        rawContent = "";
      }

      updates.content = sanitizeRichText(rawContent);
    }

    if (body.author !== undefined) updates.author = body.author ? body.author.trim() : null;
    if (body.date !== undefined) updates.date = body.date;
    if (body.readTime !== undefined) updates.readTime = body.readTime;
    if (body.shortDesc !== undefined) updates.shortDesc = body.shortDesc;

    if (body.status !== undefined) {
      updates.status = body.status === "draft" ? "draft" : "published";
      if (updates.status === "published" && !existing.publishedAt) {
        updates.publishedAt = new Date();
      }
    }

    if (body.publishedAt !== undefined) {
      updates.publishedAt = body.publishedAt ? new Date(body.publishedAt) : null;
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

    // Image replacement & cleanup
    let oldImageToDelete = null;
    if (req.file) {
      const newPath = `blogs/${req.file.filename}`;
      updates.image = newPath;
      if (existing.image) oldImageToDelete = existing.image;
    }

    await Blog.update(updates, { where: { id }, transaction });

    // If legacy blocks array was explicitly passed, update BlogBlocks table
    if (Array.isArray(legacyBlocks)) {
      await BlogBlock.destroy({ where: { blogId: id }, transaction });
      if (legacyBlocks.length > 0) {
        await BlogBlock.bulkCreate(
          legacyBlocks.map((b, index) => ({
            blogId: id,
            type: b.type,
            text: b.text || null,
            items: b.items || null,
            order: index,
          })),
          { transaction }
        );
      }
    }

    await transaction.commit();

    if (oldImageToDelete) {
      deleteUploadedFile(oldImageToDelete);
    }

    const updated = await Blog.findByPk(id, {
      include: [{ model: BlogBlock, as: "contentBlocks" }],
    });

    res.json({
      message: "Blog updated successfully",
      blog: {
        ...updated.toJSON(),
        image: makeUrl(updated.image),
      },
    });
  } catch (err) {
    await transaction.rollback();
    console.error("Update blog failed:", err);
    res.status(500).json({ message: "Failed to update blog: " + err.message });
  }
};

/**
 * Admin: DELETE /api/admin/blogs/:id or /api/blogs/:id
 * Soft deletes the blog.
 */
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await Blog.destroy({ where: { id } });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Delete blog failed:", err);
    res.status(500).json({ message: "Failed to delete blog" });
  }
};

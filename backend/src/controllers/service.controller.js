const db = require("../models");
const { Service, ServiceOffering } = db;
const makeUrl = require("../utils/fileUrl");

/* GET all services */
exports.getAll = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [{ model: ServiceOffering, as: "offerings" }],
    });

    res.json(
      services.map((s) => ({
        ...s.toJSON(),
        icon: makeUrl(s.icon),
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

/* GET one service */
exports.getOne = async (req, res) => {
  try {
    const service = await Service.findOne({
      where: { slug: req.params.slug },
      include: [{ model: ServiceOffering, as: "offerings" }],
    });

    if (!service) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch service" });
  }
};

/* CREATE service */
exports.create = async (req, res) => {
  try {
    const body = req.body || {};
    const offerings =
      typeof body.offerings === "string"
        ? JSON.parse(body.offerings)
        : body.offerings;

    const service = await Service.create({
      slug: body.slug,
      title: body.title,
      description: body.description,
      intro: body.intro,
      closing: body.closing,
      icon: req.file ? `services/${req.file.filename}` : null,
    });

    if (Array.isArray(offerings)) {
      await ServiceOffering.bulkCreate(
        offerings.map((text, index) => ({
          serviceId: service.id,
          text,
          order: index,
        }))
      );
    }

    res.status(201).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create service" });
  }
};

/* UPDATE service */
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};

    const offerings =
      typeof body.offerings === "string"
        ? JSON.parse(body.offerings)
        : body.offerings;

    const updates = {};
    if (body.slug !== undefined) updates.slug = body.slug;
    if (body.title !== undefined) updates.title = body.title;
    if (body.description !== undefined) updates.description = body.description;
    if (body.intro !== undefined) updates.intro = body.intro;
    if (body.closing !== undefined) updates.closing = body.closing;

    if (req.file) {
      updates.icon = `services/${req.file.filename}`;
    }

    const [affected] = await Service.update(updates, { where: { id } });

    if (!affected) {
      return res.status(404).json({ message: "Service not updated" });
    }

    if (Array.isArray(offerings)) {
      await ServiceOffering.destroy({ where: { serviceId: id } });
      await ServiceOffering.bulkCreate(
        offerings.map((text, index) => ({
          serviceId: id,
          text,
          order: index,
        }))
      );
    } 

    res.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update service" });
  }
};

/* DELETE service (soft delete via paranoid) */
exports.remove = async (req, res) => {
  try {
    await Service.destroy({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete service" });
  }
};

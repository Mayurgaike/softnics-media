const db = require("../models");
const { Service, ServiceOffering } = db;
const makeUrl = require("../utils/fileUrl");

/* GET all services (public) */
exports.getAll = async (req, res) => {
  const services = await Service.findAll({
    include: [{ model: ServiceOffering, as: "offerings" }],
  });

  res.json(
    services.map((s) => ({
      ...s.toJSON(),
      icon: makeUrl(s.icon),
    }))
  );
};

/* GET one service by slug */
exports.getOne = async (req, res) => {
  const service = await Service.findOne({
    where: { slug: req.params.slug },
    include: [{ model: ServiceOffering, as: "offerings" }],
  });
  if (!service) return res.status(404).json({ message: "Not found" });
  res.json(service);
};

/* CREATE service */
exports.create = async (req, res) => {
  const { offerings, ...serviceData } = req.body;

  const service = await Service.create(serviceData);

  if (offerings?.length) {
    const rows = offerings.map((text, index) => ({
      serviceId: service.id,
      text,
      order: index,
    }));
    await ServiceOffering.bulkCreate(rows);
  }

  res.status(201).json(service);
};

/* UPDATE service */
exports.update = async (req, res) => {
  const { offerings, ...serviceData } = req.body;

  await Service.update(serviceData, {
    where: { id: req.params.id },
  });

  if (offerings) {
    await ServiceOffering.destroy({ where: { serviceId: req.params.id } });
    const rows = offerings.map((text, index) => ({
      serviceId: req.params.id,
      text,
      order: index,
    }));
    await ServiceOffering.bulkCreate(rows);
  }

  res.json({ message: "Updated" });
};

/* DELETE service */
exports.remove = async (req, res) => {
  await Service.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
};

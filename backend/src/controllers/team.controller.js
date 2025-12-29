const { Team } = require("../models");

exports.getAll = async (req, res) => {
  res.json(await Team.findAll());
};

exports.create = async (req, res) => {
  const member = await Team.create(req.body);
  res.status(201).json(member);
};

exports.update = async (req, res) => {
  await Team.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Updated" });
};

exports.remove = async (req, res) => {
  await Team.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
};

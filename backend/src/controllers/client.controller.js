const { Client, ClientDetail, ClientLink } = require("../models");
const makeUrl = require("../utils/fileUrl");

exports.getAll = async (req, res) => {
  const clients = await Client.findAll({
    include: [
      { model: ClientDetail, as: "details" },
      { model: ClientLink, as: "links" },
    ],
  });

  res.json(
    clients.map((c) => ({
      ...c.toJSON(),
      logo: makeUrl(c.logo),
    }))
  );
};

exports.create = async (req, res) => {
  const { name, id, logoHeight, logoWidth, shortSummary, details, links } =
    req.body;

  const logoPath = req.file ? `clients/${req.file.filename}` : null;

  const client = await Client.create({
    id,
    name,
    logo: logoPath,
    logoHeight,
    logoWidth,
    shortSummary,
  });

  if (details) {
    await ClientDetail.bulkCreate(
      JSON.parse(details).map((text) => ({
        clientId: client.id,
        text,
      }))
    );
  }

  if (links) {
    const parsedLinks = JSON.parse(links);
    await ClientLink.bulkCreate(
      Object.entries(parsedLinks).map(([platform, url]) => ({
        clientId: client.id,
        platform,
        url,
      }))
    );
  }

  res.status(201).json(client);
};

exports.remove = async (req, res) => {
  await Client.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
};

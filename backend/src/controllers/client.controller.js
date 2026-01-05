const { Client, ClientDetail, ClientLink } = require("../models");
const makeUrl = require("../utils/fileUrl");

/* GET ALL */
exports.getAll = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch clients" });
  }
};

/* CREATE */
exports.create = async (req, res) => {
  try {
    const body = req.body || {};
    const details = body.details ? JSON.parse(body.details) : [];
    const links = body.links ? JSON.parse(body.links) : {};

    const client = await Client.create({
      slug: body.slug,
      name: body.name,
      logo: req.file ? `clients/${req.file.filename}` : null,
      logoHeight: body.logoHeight,
      logoWidth: body.logoWidth,
      shortSummary: body.shortSummary,
    });

    if (details.length) {
      await ClientDetail.bulkCreate(
        details.map((text) => ({
          clientId: client.id,
          text,
        }))
      );
    }

    if (Object.keys(links).length) {
      await ClientLink.bulkCreate(
        Object.entries(links).map(([platform, url]) => ({
          clientId: client.id,
          platform,
          url,
        }))
      );
    }

    res.status(201).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create client" });
  }
};

/* UPDATE */
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};

    const updates = {};
    if (body.slug !== undefined) updates.slug = body.slug;
    if (body.name !== undefined) updates.name = body.name;
    if (body.logoHeight !== undefined) updates.logoHeight = body.logoHeight;
    if (body.logoWidth !== undefined) updates.logoWidth = body.logoWidth;
    if (body.shortSummary !== undefined)
      updates.shortSummary = body.shortSummary;

    if (req.file) {
      updates.logo = `clients/${req.file.filename}`;
    }

    const [affected] = await Client.update(updates, { where: { id } });

    if (!affected) {
      return res.status(404).json({ message: "Client not updated" });
    }

    if (body.details) {
      await ClientDetail.destroy({ where: { clientId: id } });
      const parsed = JSON.parse(body.details);
      if (parsed.length) {
        await ClientDetail.bulkCreate(
          parsed.map((text) => ({ clientId: id, text }))
        );
      }
    }

    if (body.links) {
      await ClientLink.destroy({ where: { clientId: id } });
      const parsed = JSON.parse(body.links);
      await ClientLink.bulkCreate(
        Object.entries(parsed).map(([platform, url]) => ({
          clientId: id,
          platform,
          url,
        }))
      );
    }

    res.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update client" });
  }
};

/* DELETE (soft delete) */
exports.remove = async (req, res) => {
  try {
    await Client.destroy({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete client" });
  }
};

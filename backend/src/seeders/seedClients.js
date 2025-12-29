const { Client, ClientDetail, ClientLink } = require("../models");
const clients = require("./data/clients");

module.exports = async () => {
  for (const c of clients) {
    const { details, links, ...clientData } = c;

    const client = await Client.create(clientData);

    if (Array.isArray(details)) {
      await ClientDetail.bulkCreate(
        details.map(text => ({
          clientId: client.id,
          text,
        }))
      );
    }

    if (links && typeof links === "object") {
      await ClientLink.bulkCreate(
        Object.entries(links).map(([platform, url]) => ({
          clientId: client.id,
          platform,
          url,
        }))
      );
    }
  }
};

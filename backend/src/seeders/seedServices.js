const { Service, ServiceOffering } = require("../models");
const services = require("./data/services");

module.exports = async () => {
  for (const s of services) {
    const { offerings, ...serviceData } = s;

    const service = await Service.create(serviceData);

    if (Array.isArray(offerings)) {
      await ServiceOffering.bulkCreate(
        offerings.map((text, index) => ({
          serviceId: service.id,
          text,
          order: index,
        }))
      );
    }
  }
};

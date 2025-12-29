const db = require("../models");

const seedServices = require("./seedServices");
const seedTeam = require("./seedTeam");
const seedClients = require("./seedClients");
const seedBlogs = require("./seedBlogs");

(async () => {
  await db.sequelize.sync({ force: true });

  await seedServices();
  await seedTeam();
  await seedClients();
  await seedBlogs();

  console.log("✅ ALL DATA SEEDED");
  process.exit();
})();

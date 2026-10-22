require("dotenv").config();
const sequelize = require("../config/database");
const migration = require("./20261021_add_cms_columns");

async function run() {
  const mode = process.argv[2] || "up";
  console.log(`Starting migration with mode: [${mode}]...`);

  await sequelize.authenticate();
  console.log("Connected to MySQL database.");

  const queryInterface = sequelize.getQueryInterface();

  if (mode === "up") {
    await migration.up(queryInterface, sequelize.constructor);
    console.log("Migration UP completed successfully.");
  } else if (mode === "down") {
    await migration.down(queryInterface, sequelize.constructor);
    console.log("Migration DOWN (rollback) completed successfully.");
  } else {
    console.error(`Unknown migration mode: ${mode}. Use 'up' or 'down'.`);
    process.exit(1);
  }

  process.exit(0);
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});


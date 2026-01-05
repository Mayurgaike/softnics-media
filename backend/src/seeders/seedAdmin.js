require("dotenv").config();
const bcrypt = require("bcryptjs");
const db = require("../models");

module.exports = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ DB connected");

    const email = "admin@softnicsmedia.com";
    const plainPassword = "SoftnicsM@admin$";

    const existing = await db.Admin.findOne({ where: { email } });

    if (existing) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await db.Admin.create({
      email,
      password: hashedPassword,
    });

    console.log("✅ Admin seeded successfully");
    console.log("📧 Email:", email);
    console.log("🔑 Password:", plainPassword);

    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to seed admin:", err);
    process.exit(1);
  }
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const secret = process.env.JWT_SECRET || "softnics_jwt_secret_dev_key";
    // Proper session management: do NOT set expiresIn.
    // The JWT token will persist indefinitely until the user explicitly logs out.
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      secret
    );

    res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

exports.me = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.admin.id, {
      attributes: ["id", "email", "createdAt"],
    });
    if (!admin) {
      return res.status(401).json({ message: "Admin account not found" });
    }
    res.json({
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error("Fetch admin profile failed:", err);
    res.status(500).json({ message: "Failed to fetch session profile" });
  }
};

exports.logout = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};

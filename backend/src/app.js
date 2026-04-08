require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const db = require("./models");
const serviceRoutes = require("./routes/service.routes");
const clientRoutes = require("./routes/client.routes");
const blogRoutes = require("./routes/blog.routes");
const teamRoutes = require("./routes/team.routes");
const authRoutes = require("./routes/auth.routes");
const path = require("path");

const app = express();

app.use(cors({
  origin: [
    "https://softnicsmedia.com",
    "https://www.softnicsmedia.com",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());

// DB connection check only — schema managed manually
sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ DB connection failed:", err));

app.use("/api/services", serviceRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Softnics API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

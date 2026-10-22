const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get("/me", authMiddleware, controller.me);

module.exports = router;

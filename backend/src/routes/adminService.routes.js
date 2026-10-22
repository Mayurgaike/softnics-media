const router = require("express").Router();
const controller = require("../controllers/service.controller");
const serviceRoutes = require("./service.routes");
const { validateUploadedFile } = require("../config/upload");
const auth = require("../middleware/auth.middleware");

// All admin service routes require authentication
router.use(auth);

router.get("/", controller.adminGetAll);
router.get("/:id", controller.adminGetById);
router.post("/", serviceRoutes.uploadServiceFile, validateUploadedFile, controller.create);
router.put("/:id", serviceRoutes.uploadServiceFile, validateUploadedFile, controller.update);
router.delete("/:id", controller.remove);

module.exports = router;


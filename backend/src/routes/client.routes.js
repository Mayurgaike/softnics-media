const router = require("express").Router();
const controller = require("../controllers/client.controller");
const { uploadClientLogo } = require("../config/upload");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, uploadClientLogo.single("logo"), controller.create);
router.get("/", controller.getAll);
router.delete("/:id", auth, controller.remove);
router.put("/:id", auth, uploadClientLogo.single("logo"), controller.update);

module.exports = router;

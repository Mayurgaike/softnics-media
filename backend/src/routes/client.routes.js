const router = require("express").Router();
const controller = require("../controllers/client.controller");
const { uploadClientLogo } = require("../config/upload");

router.post("/", uploadClientLogo.single("logo"), controller.create);
router.get("/", controller.getAll);
router.delete("/:id", controller.remove);
router.put("/:id", uploadClientLogo.single("logo"), controller.update);

module.exports = router;

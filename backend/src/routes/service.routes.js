const router = require("express").Router();
const controller = require("../controllers/service.controller");
const { uploadServiceIcon } = require("../config/upload");

router.get("/", controller.getAll);
router.get("/:slug", controller.getOne);
router.post(
  "/",
  uploadServiceIcon.single("icon"),
  controller.create
);

router.put(
  "/:id",
  uploadServiceIcon.single("icon"),
  controller.update
);
router.delete("/:id", controller.remove);

module.exports = router;

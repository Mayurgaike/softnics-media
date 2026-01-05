const router = require("express").Router();
const controller = require("../controllers/service.controller");
const { uploadServiceIcon } = require("../config/upload");
const auth = require("../middleware/auth.middleware");

router.get("/", controller.getAll);
router.get("/:slug", controller.getOne);
router.post(
  "/",
  auth,
  uploadServiceIcon.single("icon"),
  controller.create
);

router.put(
  "/:id",
  auth,
  uploadServiceIcon.single("icon"),
  controller.update
);
router.delete("/:id", auth, controller.remove);

module.exports = router;

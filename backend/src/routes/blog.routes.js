const router = require("express").Router();
const controller = require("../controllers/blog.controller");
const { uploadBlogImage, validateUploadedFile } = require("../config/upload");
const auth = require("../middleware/auth.middleware");

// Public endpoints
router.get("/", controller.getAll);
router.get("/:slug", controller.getOne);

// Legacy admin endpoints (backward compatibility)
router.post(
  "/",
  auth,
  uploadBlogImage.single("image"),
  validateUploadedFile,
  controller.create
);
router.put(
  "/:id",
  auth,
  uploadBlogImage.single("image"),
  validateUploadedFile,
  controller.update
);
router.delete("/:id", auth, controller.remove);

module.exports = router;

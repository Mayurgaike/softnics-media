const router = require("express").Router();
const controller = require("../controllers/blog.controller");
const { uploadBlogImage, validateUploadedFile } = require("../config/upload");
const auth = require("../middleware/auth.middleware");

// All admin blog routes require authentication
router.use(auth);

router.get("/", controller.adminGetAll);
router.get("/:id", controller.adminGetById);
router.post("/", uploadBlogImage.single("image"), validateUploadedFile, controller.create);
router.put("/:id", uploadBlogImage.single("image"), validateUploadedFile, controller.update);
router.delete("/:id", controller.remove);

module.exports = router;


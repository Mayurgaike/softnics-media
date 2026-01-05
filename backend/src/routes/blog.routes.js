const router = require("express").Router();
const c = require("../controllers/blog.controller");
const { uploadBlogImage } = require("../config/upload");
const auth = require("../middleware/auth.middleware");

router.get("/", c.getAll);
router.get("/:slug", c.getOne);
router.post("/", auth, uploadBlogImage.single("image"), c.create);
router.delete("/:id", auth, c.remove);
router.put("/:id", auth, uploadBlogImage.single("image"), c.update);

module.exports = router;

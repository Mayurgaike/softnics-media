const router = require("express").Router();
const c = require("../controllers/blog.controller");
const { uploadBlogImage } = require("../config/upload");

router.get("/", c.getAll);
router.get("/:slug", c.getOne);
router.post("/", uploadBlogImage.single("image"), c.create);
router.delete("/:id", c.remove);
router.put("/:id", uploadBlogImage.single("image"), c.update);

module.exports = router;

const router = require("express").Router();
const c = require("../controllers/blog.controller");

router.get("/", c.getAll);
router.get("/:slug", c.getOne);
router.post("/", c.create);
router.delete("/:id", c.remove);

module.exports = router;

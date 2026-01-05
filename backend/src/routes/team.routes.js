const router = require("express").Router();
const c = require("../controllers/team.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", c.getAll);
router.post("/", auth, c.create);
router.put("/:id", auth, c.update);
router.delete("/:id", auth, c.remove);

module.exports = router;

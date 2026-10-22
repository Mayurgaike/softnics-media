const router = require("express").Router();
const controller = require("../controllers/service.controller");
const { uploadServiceIcon, validateUploadedFile } = require("../config/upload");
const auth = require("../middleware/auth.middleware");

// Middleware to accept either "image" or "icon" field
const uploadServiceFile = (req, res, next) => {
  uploadServiceIcon.fields([
    { name: "image", maxCount: 1 },
    { name: "icon", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        req.file = req.files.image[0];
      } else if (req.files.icon && req.files.icon[0]) {
        req.file = req.files.icon[0];
      }
    }
    next();
  });
};

// Public endpoints
router.get("/", controller.getAll);
router.get("/:slug", controller.getOne);

// Legacy admin endpoints (backward compatibility)
router.post("/", auth, uploadServiceFile, validateUploadedFile, controller.create);
router.put("/:id", auth, uploadServiceFile, validateUploadedFile, controller.update);
router.delete("/:id", auth, controller.remove);

router.uploadServiceFile = uploadServiceFile;
module.exports = router;

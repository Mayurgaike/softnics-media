const multer = require("multer");
const path = require("path");
const fs = require("fs");

const UPLOADS_ROOT = path.resolve(__dirname, "../../uploads");

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg"]);
const ALLOWED_MIMES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml"
]);

const makeStorage = (folder) => {
  const uploadPath = path.join(UPLOADS_ROOT, folder);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (_, __, cb) => cb(null, uploadPath),
    filename: (_, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const safeExt = ALLOWED_EXTENSIONS.has(ext) ? ext : ".png";
      const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`;
      cb(null, name);
    },
  });
};

const imageFilter = (_, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype.toLowerCase();

  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return cb(new Error("Invalid file extension. Allowed: JPG, PNG, WEBP, SVG."), false);
  }

  if (!ALLOWED_MIMES.has(mime) && !file.mimetype.startsWith("image/")) {
    return cb(new Error("Invalid file MIME type. Only valid images allowed."), false);
  }

  cb(null, true);
};

const uploadOptions = (folder) => ({
  storage: makeStorage(folder),
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1,
  },
});

/**
 * Deep content inspection middleware.
 * Verifies magic bytes for binary images and sanitizes/checks SVG files.
 * Rejects unsafe files and removes them from disk immediately.
 */
const validateUploadedFile = (req, res, next) => {
  if (!req.file) return next();

  const filePath = req.file.path;
  const ext = path.extname(req.file.originalname).toLowerCase();

  try {
    const buffer = fs.readFileSync(filePath);

    // 1. Inspect SVG
    if (ext === ".svg" || req.file.mimetype === "image/svg+xml") {
      const content = buffer.toString("utf8").toLowerCase();

      // Check for dangerous scripts or handlers
      const dangerousPatterns = [
        /<script\b/i,
        /javascript:/i,
        /xlink:href\s*=\s*["']?javascript:/i,
        /\bon\w+\s*=/i, // onload, onerror, onclick, etc.
        /<foreignobject\b/i,
        /<iframe\b/i,
        /<object\b/i,
        /<embed\b/i
      ];

      for (const pattern of dangerousPatterns) {
        if (pattern.test(content)) {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          return res.status(400).json({
            message: "Unsafe SVG content detected. Scripts and event handlers are prohibited."
          });
        }
      }
    }

    // 2. Inspect PNG magic bytes: 89 50 4E 47
    else if (ext === ".png") {
      if (
        buffer.length < 8 ||
        buffer[0] !== 0x89 ||
        buffer[1] !== 0x50 ||
        buffer[2] !== 0x4e ||
        buffer[3] !== 0x47
      ) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return res.status(400).json({ message: "Corrupted or invalid PNG image file." });
      }
    }

    // 3. Inspect JPEG magic bytes: FF D8 FF
    else if (ext === ".jpg" || ext === ".jpeg") {
      if (
        buffer.length < 3 ||
        buffer[0] !== 0xff ||
        buffer[1] !== 0xd8 ||
        buffer[2] !== 0xff
      ) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return res.status(400).json({ message: "Corrupted or invalid JPEG image file." });
      }
    }

    // 4. Inspect WEBP: RIFF....WEBP
    else if (ext === ".webp") {
      if (
        buffer.length < 12 ||
        buffer.toString("ascii", 0, 4) !== "RIFF" ||
        buffer.toString("ascii", 8, 12) !== "WEBP"
      ) {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return res.status(400).json({ message: "Corrupted or invalid WEBP image file." });
      }
    }

    next();
  } catch (err) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return res.status(400).json({ message: "Error validating uploaded file." });
  }
};

/**
 * Safely delete an uploaded file by relative path without directory traversal.
 */
const deleteUploadedFile = (relPath) => {
  if (!relPath || typeof relPath !== "string") return;

  // Clean relative path
  const clean = relPath.startsWith("uploads/")
    ? relPath.replace(/^uploads\//, "")
    : relPath.replace(/^\//, "");

  const fullPath = path.resolve(UPLOADS_ROOT, clean);

  // Security check: ensure path stays within UPLOADS_ROOT
  if (!fullPath.startsWith(UPLOADS_ROOT)) {
    console.warn("Blocked path traversal attempt in deleteUploadedFile:", relPath);
    return;
  }

  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
      console.log("Deleted old file:", clean);
    } catch (e) {
      console.warn("Failed to delete file:", fullPath, e.message);
    }
  }
};

exports.uploadClientLogo = multer(uploadOptions("clients"));
exports.uploadServiceIcon = multer(uploadOptions("services"));
exports.uploadBlogImage = multer(uploadOptions("blogs"));
exports.validateUploadedFile = validateUploadedFile;
exports.deleteUploadedFile = deleteUploadedFile;
exports.UPLOADS_ROOT = UPLOADS_ROOT;

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const makeStorage = (folder) => {
  const uploadPath = path.join("uploads", folder);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (_, __, cb) => cb(null, uploadPath),
    filename: (_, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, name + ext);
    },
  });
};

const imageFilter = (_, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only images allowed"), false);
};

exports.uploadClientLogo = multer({
  storage: makeStorage("clients"),
  fileFilter: imageFilter,
});

exports.uploadServiceIcon = multer({
  storage: makeStorage("services"),
  fileFilter: imageFilter,
});

exports.uploadBlogImage = multer({
  storage: makeStorage("blogs"),
  fileFilter: imageFilter,
});

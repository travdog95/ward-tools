const multer = require("multer");
const UPLOAD_DIR = "backend/uploads/";
const upload = multer({ dest: UPLOAD_DIR });

module.exports = {
  upload,
};

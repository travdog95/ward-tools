const express = require("express");
const router = express.Router();
const {
  getFiles,
  uploadFile,
  deleteFile,
  getFile,
  importData,
} = require("../controllers/fileController");
const { upload } = require("../middleware/uploadFileMiddleware");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getFiles).post(upload.single("dataFile"), uploadFile);
router.route("/:id").get(protect, getFile).delete(protect, deleteFile);
router.route("/import").post(protect, importData);

module.exports = router;

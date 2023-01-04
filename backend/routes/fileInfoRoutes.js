const express = require("express");
const router = express.Router();
const {
  getAllFileInfo,
  deleteFileInfo,
  getFileInfo,
  updateFileInfo,
  addFileInfo,
} = require("../controllers/fileInfoController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAllFileInfo).post(protect, addFileInfo);
router
  .route("/:id")
  .get(protect, getFileInfo)
  .delete(protect, deleteFileInfo)
  .put(protect, updateFileInfo);

module.exports = router;

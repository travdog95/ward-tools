const express = require("express");
const router = express.Router();
const { getFiles, uploadFile, deleteFile } = require("../controllers/fileController");
const { upload } = require("../middleware/uploadFileMiddleware");

router.route("/").get(getFiles).post(upload.single("dataFile"), uploadFile);
router.route("/:id").delete(deleteFile);

module.exports = router;

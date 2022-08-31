const express = require("express");
const router = express.Router();
const { getFiles, uploadFile, deleteFile } = require("../controllers/fileController");

router.route("/").get(getFiles).post(uploadFile);

router.route("/:id").delete(deleteFile);

module.exports = router;

const asyncHandler = require("express-async-handler");
const fs = require("fs");
const constants = require("../config/constants");

// @desc    Get files
// @router  GET /api/files
// @access  Private
const getFiles = asyncHandler(async (req, res) => {
  let files = [];

  //Read files in uploads directory
  fs.readdir("./" + constants.UPLOAD_DIR, (err, uploadedFiles) => {
    //handling error
    if (err) {
      res.status(400);
      throw new Error("Unable to scan directory: " + err);
    }

    //Add file to files array
    uploadedFiles.forEach((file) => {
      files.push(file);
    });

    res.status(200).json(files);
  });
});

// @desc    Add file
// @router  POST /api/files
// @access  Private
const uploadFile = asyncHandler(async (req, res, next) => {
  const uploadData = req.file;

  res.status(200).json(uploadData);
});

// @desc    Delete file
// @router  DELETE /api/files/:fileName
// @access  Private
const deleteFile = asyncHandler(async (req, res) => {
  const file = req.params.id;

  if (!file) {
    res.status(400);
    throw new Error("File not found");
  }

  fs.unlink("./" + constants.UPLOAD_DIR + "/" + file, (err) => {
    if (err) {
      res.status(400);
      throw new Error(err);
    }

    res.status(200).json({ messsage: "File deleted", file });
  });
});

module.exports = {
  getFiles,
  uploadFile,
  deleteFile,
};

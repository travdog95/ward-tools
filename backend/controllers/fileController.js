const asyncHandler = require("express-async-handler");
const fs = require("fs");

// @desc    Get files
// @router  GET /api/files
// @access  Private
const getFiles = asyncHandler(async (req, res) => {
  const files = [];

  res.status(200).json(files);
});

// @desc    Add file
// @router  POST /api/files
// @access  Private
const uploadFile = asyncHandler(async (req, res) => {
  const fileName = "";

  res.status(200).json(fileName);
});

// @desc    Delete file
// @router  DELETE /api/files/:fileName
// @access  Private
const deleteFile = asyncHandler(async (req, res) => {
  const fileName = req.params.fileName;

  if (!fileName) {
    res.status(400);
    throw new Error("File not found");
  }

  res.status(200).json({ fileName });
});

module.exports = {
  getFiles,
  uploadFile,
  deleteFile,
};

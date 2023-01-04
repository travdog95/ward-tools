const asyncHandler = require("express-async-handler");
const fs = require("fs");

const { UPLOAD_DIR } = require("../config/constants");
const FileInfo = require("../models/fileInformationModel");
const Member = require("../models/memberModel");

const getMemberId = (url) => {
  let memberId = 0;
  const protocol = "https://";

  if (url.indexOf(protocol) >= 0) {
    url = url.substring(protocol.length);
  }

  const urlSegments = url.split("/");

  memberId = urlSegments[3].substring(0, urlSegments[3].indexOf("?"));

  return parseInt(memberId);
};

const readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// @desc    Get files
// @router  GET /api/fileinfo
// @access  Private
const getAllFileInfo = asyncHandler(async (req, res) => {
  const fileInfo = await FileInfo.find();
  res.status(200).json(fileInfo);
});

// @desc    Get file
// @router  GET /api/fileinfo/:id
// @access  Private
const getFileInfo = asyncHandler(async (req, res) => {
  const fileId = req.params.id;

  const fileInfo = await FileInfo.findById(fileId);

  res.status(200).json(fileInfo);
});

// @desc    Delete file
// @router  DELETE /api/fileinfo/:id
// @access  Private
const deleteFileInfo = asyncHandler(async (req, res) => {
  const fileId = req.params.id;

  if (!fileId) {
    res.status(400);
    throw new Error("Please include fileId");
  }

  //find file
  const fileInfo = await FileInfo.findById(fileId);

  //Delete file
  fs.unlink("./" + UPLOAD_DIR + "/" + fileInfo.fileLocation, (err) => {
    if (err) {
      res.status(400);
      throw new Error(err);
    }

    //TODO: delete fileInfo doc
    //Delete fileInfo document
    //const deleteFileInfo = await FileInfo.deleteById(fileId)
  });
});

// @desc    Add fileinfo
// @router  POST /api/fileinfo
// @access  Private
const addFileInfo = asyncHandler(async (req, res) => {
  if (!req.body.filename || !req.body.destination) {
    res.status(400);
    throw new Error("Please include filename and destination");
  }

  const newFileInfo = await FileInfo.create({
    filename: req.body.filename,
    destination: req.body.destination,
  });

  res.status(200).json(newFileInfo);
});

// @desc    Update fileinfo
// @router  PUT /api/fileinfo/:id
// @access  Private
const updateFileInfo = asyncHandler(async (req, res) => {
  const fileInfo = await FileInfo.findById(req.params.id);

  if (!fileInfo) {
    res.status(400);
    throw new Error("File Info not found");
  }

  const updatedFileInfo = await FileInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedPrayer);
});

module.exports = {
  getAllFileInfo,
  deleteFileInfo,
  getFileInfo,
  updateFileInfo,
  addFileInfo,
};

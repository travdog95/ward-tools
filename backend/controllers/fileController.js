const asyncHandler = require("express-async-handler");
const fs = require("fs");
const url = require("url");
const constants = require("../config/constants");
const Member = require("../models/memberModel");

const getMemberId = (url) => {
  let memberId = 0;
  const protocol = "https://";

  if (url.indexOf(protocol) >= 0) {
    url = url.substring(protocol.length);
  }

  const urlSegments = url.split("/");

  memberId = urlSegments[3].substring(0, urlSegments[3].indexOf("?"));

  return memberId;
};

const readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    console.log(err);
  }
};

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

// @desc    Get file
// @router  GET /api/files
// @access  Private
const getFile = asyncHandler(async (req, res) => {
  const filename = req.params.id;

  // Use fs.readFile() method to read the file
  fs.readFile("./" + constants.UPLOAD_DIR + "/" + filename, function (err, data) {
    if (err) {
      res.status(400);
      throw new Error("Unable to read file: " + err);
    }

    const file = {
      filename,
      data: JSON.parse(data),
    };

    res.status(200).json(file);
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

// @desc    Import Data file
// @router  POST /api/files/import
// @access  Private
const importData = asyncHandler(async (req, res) => {
  const { filename } = req.body;

  if (!filename) {
    res.status(400);
    throw new Error("Please include filename");
  }

  const data = await readFile("./" + constants.UPLOAD_DIR + "/" + filename);
  const fileData = JSON.parse(data);
  let members = [];
  let errors = [];

  await Promise.all(
    fileData.map(async (row) => {
      let memberId = getMemberId(row.PreferredName_URL);
      let firstName, middleName, lastName, suffix;

      const memberExists = await Member.findOne({ memberId });

      const memberData = {
        firstName,
        middleName,
        lastName,
        suffix,
        city: row["Address-City"],
        postalCode: row["Address-PostalCode"],
        state: row["Address-StateorProvince"],
        // birthDate: ,
        gender: row.Gender,
        email: row["IndividualE-mail"],
        phone: row.IndividualPhone,
        callings: row.CallingswithDateSustainedandSetApart,
        // moveInDate: Date,
        preferredName: row.PreferredName,
        memberId,
        priesthoodOffice: row.PriesthoodOffice,
        // templeRecommendExpirationDate: Date,
        templeRecommendStatus: row.TempleRecommendStatus,
        templeRecommendType: row.TempleRecommendType,
      };

      if (memberExists) {
        //Update member
        // const member = await Member.update(memberData);
      } else {
        //Add member
        const member = await Member.create(memberData);

        if (member) {
          members.push({
            _id: member.id,
            memberId: member.memberId,
          });
        } else {
          errors.push({
            memberId,
          });
        }
      }
    })
  );

  if (errors.length > 0) {
    res.status(400);
    throw new Error("Invalid member data");
  }

  res.status(201).json({ messsage: "Data imported!", data: members });

  // // Use fs.readFile() method to read the file
  // fs.readFile("./" + constants.UPLOAD_DIR + "/" + filename,  function (err, data) {
  //   if (err) {
  //     res.status(400);
  //     throw new Error("Unable to read file: " + err);
  //   }

  //   const fileData = JSON.parse(data);

  //   let firstName, middleName, lastName, suffix;

  //   fileData.forEach((row) => {
  //     let memberId = getMemberId(row.PreferredName_URL);

  //     const member = await Member.create({
  //       firstName,
  //       middleName,
  //       lastName,
  //       suffix,
  //       city: row["Address-City"],
  //       postalCode: row["Address-PostalCode"],
  //       state: row["Address-StateorProvince"],
  //       // birthDate: ,
  //       gender: row.Gender,
  //       email: row["IndividualE-mail"],
  //       phone: row.IndividualPhone,
  //       callings: row.CallingswithDateSustainedandSetApart,
  //       // moveInDate: Date,
  //       preferredName: row.PreferredName,
  //       memberId,
  //       priesthoodOffice: row.PriesthoodOffice,
  //       // templeRecommendExpirationDate: Date,
  //       templeRecommendStatus: row.TempleRecommendStatus,
  //       templeRecommendType: row.TempleRecommendType,
  //     });

  //   });

  //   res.status(201).json({ messsage: "Data imported!", data: fileData });
  // });
});

module.exports = {
  getFiles,
  uploadFile,
  deleteFile,
  getFile,
  importData,
};

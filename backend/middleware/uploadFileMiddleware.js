const multer = require("multer");
const constants = require("../config/constants");

const upload = multer({ dest: constants.UPLOAD_DIR });

// const addZero = (i) => {
//   if (i < 10) {
//     i = "0" + i;
//   }
//   return i;
// };

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: constants.UPLOAD_DIR,
//     filename: function (req, file, cb) {
//       let originalFileName = file.originalname;
//       let originalFileFrgs = originalFileName.split(".");

//       const today = new Date();
//       const fullYear = today.getFullYear();
//       const month = addZero(today.getMonth());
//       const day = addZero(today.getDate());
//       const Hours = today.getHours();
//       const Mins = today.getMinutes();
//       const Secs = today.getSeconds();
//       let fileSuffix = [fullYear, month, day].join("") + "-" + [Hours, Mins, Secs].join("");

//       originalFileFrgs[0] = originalFileFrgs[0] + "#" + fileSuffix;
//       file.filename = originalFileFrgs.join(".");
//       cb(null, file.filename);
//     },
//   }),
// });

module.exports = {
  upload,
};

const express = require("express");
const router = express.Router();
const { importSpeakerData } = require("../controllers/importDataController");
const { protect } = require("../middleware/authMiddleware");

router.route("/speakerData").post(protect, importSpeakerData);

module.exports = router;

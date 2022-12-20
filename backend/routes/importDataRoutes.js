const express = require("express");
const router = express.Router();
const { importSpeakerData, importPrayerData } = require("../controllers/importDataController");
const { protect } = require("../middleware/authMiddleware");

router.route("/speakerData").post(protect, importSpeakerData);
router.route("/prayerData").post(protect, importPrayerData);

module.exports = router;

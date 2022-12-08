const express = require("express");
const router = express.Router();
const {
  fixMeetings,
  fixTalks,
  fixPrayers,
  fixMembers,
  fixUsers,
  resetTalks,
} = require("../controllers/fixController");
const { protect } = require("../middleware/authMiddleware");

router.route("/meetings").get(protect, fixMeetings);
router.route("/talks").get(protect, fixTalks);
router.route("/talks/reset").get(protect, resetTalks);
router.route("/prayers").get(protect, fixPrayers);
router.route("/members").get(protect, fixMembers);
router.route("/users").get(protect, fixUsers);

module.exports = router;

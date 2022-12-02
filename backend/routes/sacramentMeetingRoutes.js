const express = require("express");
const router = express.Router();
const {
  getSacramentMeeting,
  getSacramentMeetings,
  addSacramentMeeting,
  updateSacramentMeeting,
  patchSacramentMeeting,
  deleteSacramentMeeting,
  getSacramentMeetingsByYear,
  addSacramentMeetingsByYear,
  deleteSacramentMeetingsByYear,
} = require("../controllers/sacramentMeetingController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getSacramentMeetings).post(protect, addSacramentMeeting);

router
  .route("/year/:year")
  .get(protect, getSacramentMeetingsByYear)
  .delete(protect, deleteSacramentMeetingsByYear)
  .post(protect, addSacramentMeetingsByYear);

router
  .route("/:id")
  .put(protect, updateSacramentMeeting)
  .patch(protect, patchSacramentMeeting)
  .delete(protect, deleteSacramentMeeting)
  .get(protect, getSacramentMeeting);

module.exports = router;

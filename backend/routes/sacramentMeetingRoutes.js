const express = require("express");
const router = express.Router();
const {
  getSacramentMeetings,
  addSacramentMeeting,
  updateSacramentMeeting,
  patchSacramentMeeting,
  deleteSacramentMeeting,
  getSacramentMeeting,
} = require("../controllers/sacramentMeetingController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getSacramentMeetings).post(protect, addSacramentMeeting);

router
  .route("/:id")
  .put(protect, updateSacramentMeeting)
  .patch(protect, patchSacramentMeeting)
  .delete(protect, deleteSacramentMeeting)
  .get(protect, getSacramentMeeting);

module.exports = router;

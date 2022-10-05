const express = require("express");
const router = express.Router();
const {
  getTalks,
  addTalk,
  updateTalk,
  patchTalk,
  deleteTalk,
  getTalk,
  getTalksByMember,
} = require("../controllers/talkController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getTalks).post(protect, addTalk);
router.route("/member/:memberId").get(protect, getTalksByMember);

router
  .route("/:id")
  .put(protect, updateTalk)
  .patch(protect, patchTalk)
  .delete(protect, deleteTalk)
  .get(protect, getTalk);

module.exports = router;

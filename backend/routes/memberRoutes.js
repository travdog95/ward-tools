const express = require("express");
const router = express.Router();
const {
  getMembers,
  addMember,
  updateMember,
  patchMember,
  deleteMember,
  getMember,
  getTalksByMember,
} = require("../controllers/memberController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getMembers).post(protect, addMember);
router.route("/:id/talks").get(protect, getTalksByMember);

router
  .route("/:id")
  .put(protect, updateMember)
  .patch(protect, patchMember)
  .delete(protect, deleteMember)
  .get(protect, getMember);

module.exports = router;

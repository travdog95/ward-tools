const express = require("express");
const router = express.Router();
const {
  getMembers,
  addMember,
  updateMember,
  patchMember,
  deleteMember,
} = require("../controllers/memberController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getMembers).post(protect, addMember);
// router.get("/", getMembers);

// router.post("/", addMember);

router
  .route("/:id")
  .put(protect, updateMember)
  .patch(protect, patchMember)
  .delete(protect, deleteMember);

// router.put("/:id", updateMember);

// router.patch("/:id", patchMember);

// router.delete("/:id", deleteMember);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getMembers,
  addMember,
  updateMember,
  patchMember,
  deleteMember,
} = require("../controllers/memberController");

router.route("/").get(getMembers).post(addMember);
// router.get("/", getMembers);

// router.post("/", addMember);

router.route("/:id").put(updateMember).patch(patchMember).delete(deleteMember);

// router.put("/:id", updateMember);

// router.patch("/:id", patchMember);

// router.delete("/:id", deleteMember);

module.exports = router;

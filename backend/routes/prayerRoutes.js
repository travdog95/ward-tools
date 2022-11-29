const express = require("express");
const router = express.Router();
const {
  getPrayers,
  addPrayer,
  updatePrayer,
  patchPrayer,
  deletePrayer,
  getPrayer,
} = require("../controllers/prayerController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getPrayers).post(protect, addPrayer);

router
  .route("/:id")
  .put(protect, updatePrayer)
  .patch(protect, patchPrayer)
  .delete(protect, deletePrayer)
  .get(protect, getPrayer);

module.exports = router;

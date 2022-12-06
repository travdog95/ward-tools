const express = require("express");
const router = express.Router();
const { getSpeakers } = require("../controllers/speakerController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getSpeakers);

module.exports = router;

const asyncHandler = require("express-async-handler");

const Prayer = require("../models/prayerModel");

// @desc    Get prayers
// @router  GET /api/prayers
// @access  Private
const getPrayers = asyncHandler(async (req, res) => {
  let prayers = [];
  if (Object.keys(req.query).length === 0) {
    prayers = await Prayer.find();
  } else {
    prayers = await Prayer.find(req.query);
  }

  res.status(200).json(prayers);
});

// @desc    Get prayer
// @router  GET /api/prayers/:id
// @access  Private
const getPrayer = asyncHandler(async (req, res) => {
  const prayer = await Prayer.findById(req.params.id);

  res.status(200).json(prayer);
});

// @desc    Add prayer
// @router  POST /api/prayers
// @access  Private
const addPrayer = asyncHandler(async (req, res) => {
  if (!req.body.member) {
    res.status(400);
    throw new Error("Please add member");
  }

  if (!req.body.sacramentMeeting) {
    res.status(400);
    throw new Error("Please add sacrament meeting");
  }

  const prayer = await Prayer.create({
    prayerType: req.body.prayerType,
    member: req.body.member,
    sacramentMeeting: req.body.sacramentMeeting,
    date: req.body.date,
  });

  res.status(200).json(prayer);
});

// @desc    Update prayer
// @router  PUT /api/prayers/:id
// @access  Private
const updatePrayer = asyncHandler(async (req, res) => {
  const prayer = await Prayer.findById(req.params.id);

  if (!prayer) {
    res.status(400);
    throw new Error("Prayer not found");
  }

  const updatedPrayer = await Prayer.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedPrayer);
});

// @desc    Patch prayer
// @router  PATCH /api/prayers/:id
// @access  Private
const patchPrayer = asyncHandler(async (req, res) => {
  const prayer = await Prayer.findById(req.params.id);

  if (!prayer) {
    res.status(400);
    throw new Error("Prayer not found");
  }

  const patchedPrayer = await Prayer.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(patchedPrayer);
});

// @desc    Delete prayer
// @router  DELETE /api/prayers/:id
// @access  Private
const deletePrayer = asyncHandler(async (req, res) => {
  const prayer = await Prayer.findById(req.params.id);

  if (!prayer) {
    res.status(400);
    throw new Error("Prayer not found");
  }

  await prayer.remove();

  res.status(200).json(prayer);
});

module.exports = {
  getPrayers,
  addPrayer,
  updatePrayer,
  patchPrayer,
  deletePrayer,
  getPrayer,
};

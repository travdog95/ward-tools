const asyncHandler = require("express-async-handler");

const SacramentMeeting = require("../models/sacramentMeetingModel");
const Talk = require("../models/talkModel");

// @desc    Get sacramentMeetings
// @router  GET /api/sacramentmeetings
// @access  Private
const getSacramentMeetings = asyncHandler(async (req, res) => {
  let sacramentMeetings = [];

  if (req.query.year) {
    sacramentMeetings = await SacramentMeeting.find({
      date: {
        $gte: new Date(`${req.query.year}-01-01`),
        $lte: new Date(`${req.query.year}-12-31`),
      },
    }).sort({ date: -1 });
  } else {
    sacramentMeetings = await SacramentMeeting.find();
  }

  let newMeetings = [];
  await Promise.all(
    sacramentMeetings.map(async (meeting) => {
      const talks = await Talk.find({ sacramentMeeting: meeting.id }).populate("member").exec();
      const newMeeting = { ...meeting._doc, ...{ talks } };
      newMeetings.push(newMeeting);
    })
  );

  res.status(200).json(newMeetings);
});

// @desc    Get sacramentMeeting
// @router  GET /api/sacramentmeetings/:id
// @access  Private
const getSacramentMeeting = asyncHandler(async (req, res) => {
  const sacramentMeeting = await SacramentMeeting.findById(req.params.id);

  res.status(200).json(sacramentMeeting);
});

// @desc    Add sacramentMeeting
// @router  POST /api/sacramentmeetings
// @access  Private
const addSacramentMeeting = asyncHandler(async (req, res) => {
  if (!req.body.date) {
    res.status(400);
    throw new Error("Please add date");
  }

  const sacramentMeeting = await SacramentMeeting.create({
    theme: req.body.theme,
    date: req.body.date,
  });

  res.status(200).json(sacramentMeeting);
});

// @desc    Update sacramentMeeting
// @router  PUT /api/sacramentmeetings/:id
// @access  Private
const updateSacramentMeeting = asyncHandler(async (req, res) => {
  const sacramentMeeting = await SacramentMeeting.findById(req.params.id);

  if (!sacramentMeeting) {
    res.status(400);
    throw new Error("Sacrament Meeting not found");
  }

  const updatedSacramentMeeting = await SacramentMeeting.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedSacramentMeeting);
});

// @desc    Patch sacramentMeeting
// @router  PATCH /api/sacramentmeetings/:id
// @access  Private
const patchSacramentMeeting = asyncHandler(async (req, res) => {
  const sacramentMeeting = await SacramentMeeting.findById(req.params.id);

  if (!sacramentMeeting) {
    res.status(400);
    throw new Error("Sacrament Meeting not found");
  }

  const patchedSacramentMeeting = await SacramentMeeting.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(patchedSacramentMeeting);
});

// @desc    Delete sacramentMeeting
// @router  DELETE /api/sacramentmeetings/:id
// @access  Private
const deleteSacramentMeeting = asyncHandler(async (req, res) => {
  const sacramentMeeting = await SacramentMeeting.findById(req.params.id);

  if (!sacramentMeeting) {
    res.status(400);
    throw new Error("Sacrament Meeting not found");
  }

  await sacramentMeeting.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getSacramentMeetings,
  addSacramentMeeting,
  updateSacramentMeeting,
  patchSacramentMeeting,
  deleteSacramentMeeting,
  getSacramentMeeting,
};

const asyncHandler = require("express-async-handler");

const Talk = require("../models/talkModel");
const Member = require("../models/memberModel");
const Meeting = require("../models/sacramentMeetingModel");

// @desc    Get speakers
// @router  GET /api/speakers
// @access  Private
const getSpeakers = asyncHandler(async (req, res) => {
  let speakers = [];
  let members = [];

  members = await Member.find({ firstName: "Sabrina" }).populate("talks").populate("prayers");

  res.status(200).json(members);
});

module.exports = {
  getSpeakers,
};

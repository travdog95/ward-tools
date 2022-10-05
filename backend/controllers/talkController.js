const asyncHandler = require("express-async-handler");

const Talk = require("../models/talkModel");

// @desc    Get talks
// @router  GET /api/talks
// @access  Private
const getTalks = asyncHandler(async (req, res) => {
  console.log(req.query);
  let talks = [];
  if (Object.keys(req.query).length === 0) {
    console.log("query params empty");
    talks = await Talk.find();
  } else {
    console.log("query params");
    talks = await Talk.find(req.query);
  }

  res.status(200).json(talks);
});

// @desc    Get talks by member
// @router  GET /api/talks/:member
// @access  Private
const getTalksByMember = asyncHandler(async (req, res) => {
  const { memberId } = req.params;
  const talks = await Talk.find({ member: memberId });

  res.status(200).json(talks);
});

// @desc    Get talk
// @router  GET /api/talks/:id
// @access  Private
const getTalk = asyncHandler(async (req, res) => {
  const talk = await Talk.findById(req.params.id);

  res.status(200).json(talk);
});

// @desc    Add talk
// @router  POST /api/talks
// @access  Private
const addTalk = asyncHandler(async (req, res) => {
  if (!req.body.member) {
    res.status(400);
    throw new Error("Please add member");
  }

  if (!req.body.sacramentMeeting) {
    res.status(400);
    throw new Error("Please add sacrament meeting");
  }

  const talk = await Talk.create({
    topic: req.body.topic,
    member: req.body.member,
    sacramentMeeting: req.body.sacramentMeeting,
  });

  res.status(200).json(talk);
});

// @desc    Update talk
// @router  PUT /api/talks/:id
// @access  Private
const updateTalk = asyncHandler(async (req, res) => {
  const talk = await Talk.findById(req.params.id);

  if (!talk) {
    res.status(400);
    throw new Error("Talk not found");
  }

  const updatedTalk = await Talk.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedTalk);
});

// @desc    Patch talk
// @router  PATCH /api/talks/:id
// @access  Private
const patchTalk = asyncHandler(async (req, res) => {
  const talk = await Talk.findById(req.params.id);

  if (!talk) {
    res.status(400);
    throw new Error("Talk not found");
  }

  const patchedTalk = await Talk.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(patchedTalk);
});

// @desc    Delete talk
// @router  DELETE /api/talks/:id
// @access  Private
const deleteTalk = asyncHandler(async (req, res) => {
  const talk = await Talk.findById(req.params.id);

  if (!talk) {
    res.status(400);
    throw new Error("Talk not found");
  }

  await talk.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTalks,
  getTalksByMember,
  addTalk,
  updateTalk,
  patchTalk,
  deleteTalk,
  getTalk,
};

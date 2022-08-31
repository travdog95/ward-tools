const asyncHandler = require("express-async-handler");

const Member = require("../models/memberModel");

// @desc    Get members
// @router  GET /api/members
// @access  Private
const getMembers = asyncHandler(async (req, res) => {
  const members = await Member.find();

  res.status(200).json(members);
});

// @desc    Add member
// @router  POST /api/members
// @access  Private
const addMember = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a name field");
  }

  const member = await Member.create({
    text: req.body.text,
  });

  res.status(200).json(member);
});

// @desc    Update member
// @router  PUT /api/members/:id
// @access  Private
const updateMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);

  if (!member) {
    res.status(400);
    throw new Error("Member not found");
  }

  const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedMember);
});

// @desc    Patch member
// @router  PATCH /api/members/:id
// @access  Private
const patchMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);

  if (!member) {
    res.status(400);
    throw new Error("Member not found");
  }

  const patchedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(patchedMember);
});

// @desc    Delete member
// @router  DELETE /api/members/:id
// @access  Private
const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);

  if (!member) {
    res.status(400);
    throw new Error("Member not found");
  }

  await member.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMembers,
  addMember,
  updateMember,
  patchMember,
  deleteMember,
};

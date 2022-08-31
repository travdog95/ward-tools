const asyncHandler = require("express-async-handler");

// @desc    Get members
// @router  GET /api/members
// @access  Private
const getMembers = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get members" });
});

// @desc    Add member
// @router  POST /api/members
// @access  Private
const addMember = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }
  res.status(200).json({ message: "Add member" });
});

// @desc    Update member
// @router  PUT /api/members/:id
// @access  Private
const updateMember = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update member" });
});

// @desc    Patch member
// @router  PATCH /api/members/:id
// @access  Private
const patchMember = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Patch member" });
});

// @desc    Delete member
// @router  DELETE /api/members/:id
// @access  Private
const deleteMember = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete member" });
});

module.exports = {
  getMembers,
  addMember,
  updateMember,
  patchMember,
  deleteMember,
};

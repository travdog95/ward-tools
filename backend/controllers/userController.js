const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

// @desc    Get users
// @router  GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

// @desc    Add user
// @router  POST /api/users
// @access  Private
const addUser = asyncHandler(async (req, res) => {
  if (!req.body.firstName) {
    res.status(400);
    throw new Error("Please add a first name field");
  }

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  res.status(200).json(user);
});

// @desc    Update user
// @router  PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedUser);
});

// @desc    Patch user
// @router  PATCH /api/users/:id
// @access  Private
const patchUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const patchedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(patchedUser);
});

// @desc    Delete user
// @router  DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await user.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getUsers,
  addUser,
  updateUser,
  patchUser,
  deleteUser,
};

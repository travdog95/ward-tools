const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUser,
  updateUser,
  patchUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(getUsers).post(addUser);

router.route("/:id").put(updateUser).patch(patchUser).delete(deleteUser);

module.exports = router;

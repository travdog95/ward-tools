const mongoose = require("mongoose");
const { SCHEMA_VERSION } = require("../config/constants");

const userSchema = mongoose.Schema(
  {
    schemaVersion: { type: Number, default: SCHEMA_VERSION },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

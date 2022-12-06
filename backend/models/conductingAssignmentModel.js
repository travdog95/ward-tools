const mongoose = require("mongoose");
const { SCHEMA_VERSION } = require("../config/constants");

const conductingAssignmentSchema = mongoose.Schema(
  {
    schemaVersion: { type: Number, default: SCHEMA_VERSION },
    bishopricMember: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    year: {
      type: Number,
      required: true,
    },
    month: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ConductingAssignment", conductingAssignmentSchema);

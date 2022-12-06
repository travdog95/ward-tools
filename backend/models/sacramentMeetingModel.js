const mongoose = require("mongoose");
const { SCHEMA_VERSION } = require("../config/constants");

const sacramentMeetingSchema = mongoose.Schema(
  {
    schemaVersion: { type: Number, default: SCHEMA_VERSION },
    theme: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
      default: new Date(),
    },
    talksTest: [{ type: mongoose.Schema.Types.ObjectId, ref: "Talk" }],
    prayersTest: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prayer" }],
    year: { type: Number },
    month: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SacramentMeeting", sacramentMeetingSchema);

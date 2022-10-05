const mongoose = require("mongoose");

const sacramentMeetingSchema = mongoose.Schema(
  {
    theme: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SacramentMeeting", sacramentMeetingSchema);

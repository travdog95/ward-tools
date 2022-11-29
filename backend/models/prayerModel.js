const mongoose = require("mongoose");

const prayerSchema = mongoose.Schema(
  {
    prayerType: {
      type: String,
      required: true,
      default: "Invocation",
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    sacramentMeeting: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SacramentMeeting",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prayer", prayerSchema);

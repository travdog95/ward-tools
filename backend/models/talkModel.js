const mongoose = require("mongoose");

const talkSchema = mongoose.Schema(
  {
    topic: {
      type: String,
    },
    talkType: {
      type: String,
      required: true,
      default: "Adult",
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

module.exports = mongoose.model("Talk", talkSchema);

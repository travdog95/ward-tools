const mongoose = require("mongoose");
const Member = require("./memberModel");
const Meeting = require("./sacramentMeetingModel");
const { SCHEMA_VERSION } = require("../config/constants");

const talkSchema = mongoose.Schema(
  {
    schemaVersion: { type: Number, default: SCHEMA_VERSION },
    topic: {
      type: String,
      default: "",
    },
    talkType: {
      type: String,
      required: true,
      default: "Adult",
    },
    date: { type: Date, required: true },
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
    rank: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

talkSchema.pre("remove", async function (next) {
  //TODO: error handling

  //Remove talk from member document
  const updateMember = await Member.findByIdAndUpdate(this.member, {
    $pull: { talksTest: this._id },
  });

  //Remove talk from member document
  const updateMeeting = await Meeting.findByIdAndUpdate(this.sacramentMeeting, {
    $pull: { talksTest: this._id },
  });

  //TODO: update talkCount and lastTalkDate on member doc
  next();
});

talkSchema.post("save", async function (doc) {
  //TODO: add error handling

  //Add talk to member, and update talkCount
  const member = await Member.findById(doc.member);
  member.talksTest.push(doc._id);
  member.talkCount = member.talksTest.length;

  await member.save();

  //Add talk to meeting
  const meeting = await Meeting.findById(doc.sacramentMeeting);
  meeting.talksTest.push(doc._id);
  await meeting.save();
});

module.exports = mongoose.model("Talk", talkSchema);

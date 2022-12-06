const mongoose = require("mongoose");

const Member = require("./memberModel");
const Meeting = require("./sacramentMeetingModel");
const { SCHEMA_VERSION } = require("../config/constants");

const prayerSchema = mongoose.Schema(
  {
    schemaVersion: { type: Number, default: SCHEMA_VERSION },
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
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

prayerSchema.pre("remove", async function (next) {
  //TODO: error handling

  //Remove talk from member document
  const updateMember = await Member.findByIdAndUpdate(this.member, {
    $pull: { prayersTest: this._id },
  });

  //Remove talk from member document
  const updateMeeting = await Meeting.findByIdAndUpdate(this.sacramentMeeting, {
    $pull: { prayersTest: this._id },
  });

  next();
});

prayerSchema.post("save", async function (doc) {
  //TODO: add error handling

  //Add talk to member
  const member = await Member.findById(doc.member);
  member.prayersTest.push(doc._id);
  await member.save();

  //Add talk to meeting
  const meeting = await Meeting.findById(doc.sacramentMeeting);
  meeting.prayersTest.push(doc._id);
  await meeting.save();
});

module.exports = mongoose.model("Prayer", prayerSchema);

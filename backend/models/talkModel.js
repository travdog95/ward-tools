const mongoose = require("mongoose");
// const { isAfter } = require("date-fns");

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
    date: { type: Date, required: true, default: null },
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
  try {
    //find current member talks
    const member = await Member.findById(this.member).populate("talksTest");

    //Filter out talk being removed
    const memberTalks = member.talksTest.filter(
      (talk) => talk._id.toString() !== this._id.toString()
    );

    //Determine new lastTalkDate
    const lastTalkDate = memberTalks.length === 0 ? null : getLastTalkDate(memberTalks);

    //Update member
    const updateMember = await Member.findByIdAndUpdate(this.member, {
      $pull: { talksTest: this._id },
      $inc: { talkCount: -1 },
      lastTalkDate,
    });

    //Remove talk from sacrament meeting document
    const updateMeeting = await Meeting.findByIdAndUpdate(this.sacramentMeeting, {
      $pull: { talksTest: this._id },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error on pre.remove middleware for Talk", error);
  }
  next();
});

talkSchema.post("save", async function (doc) {
  try {
    //Add talk to member, and update talkCount
    const member = await Member.findById(doc.member).populate("talksTest");

    const lastTalkDate = getLastTalkDate(member.talksTest, doc.date);

    //Update member
    const updateMember = await Member.findByIdAndUpdate(doc.member, {
      $push: { talksTest: doc._id },
      $inc: { talkCount: 1 },
      lastTalkDate,
    });

    //Add talk to meeting
    const meeting = await Meeting.findById(doc.sacramentMeeting);
    meeting.talksTest.push(doc._id);
    await meeting.save();
  } catch (error) {
    console.error(error);
    throw new Error("Error on pre.remove middleware for Talk", error);
  }
});

const getLastTalkDate = (talks, newTalkDate = null) => {
  //If this is the first talk, retun newTalkDate
  if (talks.length === 0 || !talks[0].date) {
    return newTalkDate;
  }

  let talkDates = talks;
  if (newTalkDate) {
    //add to array to compare to existing talk dates
    talkDates.push({ date: newTalkDate });
  }

  //Sort talks by date descending
  talkDates.sort((a, b) => {
    let da = new Date(a.date);
    let db = new Date(b.date);
    return db - da;
  });

  return talkDates[0].date;
};

module.exports = mongoose.model("Talk", talkSchema);

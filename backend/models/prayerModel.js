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
    date: { type: Date, required: true, default: null },
  },
  {
    timestamps: true,
  }
);

prayerSchema.pre("remove", async function (next) {
  try {
    //find current member prayers
    const member = await Member.findById(this.member).populate("prayersTest");

    //Filter out prayer being removed
    const memberPrayers = member.prayersTest.filter(
      (prayer) => prayer._id.toString() !== this._id.toString()
    );

    //Determine new lastPrayerDate
    const lastPrayerDate = memberPrayers.length === 0 ? null : getLatestDate(memberPrayers);

    //Update member
    const updateMember = await Member.findByIdAndUpdate(this.member, {
      $pull: { prayersTest: this._id },
      $inc: { prayerCount: -1 },
      lastPrayerDate,
    });

    //Remove prayer from sacrament meeting document
    const updateMeeting = await Meeting.findByIdAndUpdate(this.sacramentMeeting, {
      $pull: { prayersTest: this._id },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error on pre.remove middleware for Prayer", error);
  }
  next();
});

prayerSchema.post("save", async function (doc) {
  try {
    //Add prayer to member, and update prayerCount
    const member = await Member.findById(doc.member).populate("prayersTest");

    const lastPrayerDate = getLatestDate(member.prayersTest, doc.date);

    //Update member
    const updateMember = await Member.findByIdAndUpdate(doc.member, {
      $push: { prayersTest: doc._id },
      $inc: { prayerCount: 1 },
      lastPrayerDate,
    });

    //Add prayer to meeting
    const meeting = await Meeting.findById(doc.sacramentMeeting);
    meeting.prayersTest.push(doc._id);
    await meeting.save();
  } catch (error) {
    console.error(error);
    throw new Error("Error on pre.remove middleware for Prayer", error);
  }
});

const getLatestDate = (items, newDate = null) => {
  //If this is the first item, retun newDate
  if (items.length === 0 || !items[0].date) {
    return newDate;
  }

  let itemDates = items;
  if (newDate) {
    //add to array to compare to existing item dates
    itemDates.push({ date: newDate });
  }

  //Sort items by date descending
  itemDates.sort((a, b) => {
    let da = new Date(a.date);
    let db = new Date(b.date);
    return db - da;
  });

  return itemDates[0].date;
};

module.exports = mongoose.model("Prayer", prayerSchema);

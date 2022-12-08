const asyncHandler = require("express-async-handler");
const { getYear, getMonth } = require("date-fns");

const Talk = require("../models/talkModel");
const Meeting = require("../models/sacramentMeetingModel");
const Prayer = require("../models/prayerModel");
const Member = require("../models/memberModel");
const User = require("../models/userModel");
const { SCHEMA_VERSION } = require("../config/constants");

// @desc    Fix talks
// @router  GET /api/fix/talks
// @access  Private
const fixTalks = asyncHandler(async (req, res) => {
  const oldTalks = await Talk.find().populate("sacramentMeeting");
  res.status(200).json({ count: oldTalks.length, talks: oldTalks });

  // let newTalks = [];
  // let deletedTalks = [];

  // await Promise.all(
  //   oldTalks.map(async (oldTalk) => {
  //     //create new talk
  //     const newTalk = {
  //       topic: oldTalk.topic,
  //       talkType: oldTalk.talkType,
  //       member: oldTalk.member,
  //       sacramentMeeting: oldTalk.sacramentMeeting._id,
  //       date: oldTalk.sacramentMeeting.date,
  //     };

  //     const createNewTalk = await Talk.create(newTalk);
  //     newTalks.push(createNewTalk);

  //     //Delete old talk
  //     const deleteOldTalk = await Talk.findByIdAndDelete(oldTalk._id);
  //     deletedTalks.push(deleteOldTalk);
  //   })
  // );

  // res.status(200).json({ count: newTalks.length, newTalks, deletedTalks });
});

// @desc    Reset talks
// @router  GET /api/fix/talks/reset
// @access  Private
const resetTalks = asyncHandler(async (req, res) => {
  const talks = await Talk.find();

  await Promise.all(
    talks.map(async (talk) => {
      //Reset member
      const resetMember = await Member.findByIdAndUpdate(talk.member, {
        talks: [],
        talkCount: 0,
        lastTalkDate: null,
      });

      //Reset sacrament meeting
      const resetMeeting = await Meeting.findByIdAndUpdate(talk.sacramentMeeting, {
        talks: [],
      });
    })
  );
  res.status(200).json([]);
});

// @desc    Fix Meetings
// @router  GET /api/fix/meetings
// @access  Private
const fixMeetings = asyncHandler(async (req, res) => {
  const meetings = await Meeting.find();

  // Promise.all(
  //   meetings.map(async (meeting) => {
  //     meeting.year = getYear(meeting.date);
  //     meeting.month = getMonth(meeting.date);
  //     await meeting.save();
  //   })
  // );
  res.status(200).json({ count: meetings.length, meetings });
});

// @desc    Fix Prayers
// @router  GET /api/fix/prayers
// @access  Private
const fixPrayers = asyncHandler(async (req, res) => {
  const oldPrayers = await Prayer.find().populate("sacramentMeeting");
  res.status(200).json(oldPrayers);

  // let newPrayers = [];
  // let deletedPrayers = [];

  // await Promise.all(
  //   oldPrayers.map(async (oldPrayer) => {
  //     //create new prayer
  //     const newPrayer = {
  //       prayerType: oldPrayer.prayerType,
  //       member: oldPrayer.member,
  //       sacramentMeeting: oldPrayer.sacramentMeeting._id,
  //       date: oldPrayer.sacramentMeeting.date,
  //     };

  //     const createNewPrayer = await Prayer.create(newPrayer);
  //     newPrayers.push(createNewPrayer);

  //     //Delete old prayer
  //     const deleteOldPrayer = await Prayer.findByIdAndDelete(oldPrayer._id);
  //     deletedPrayers.push(deleteOldPrayer);
  //   })
  // );

  // res.status(200).json({ count: newPrayers.length, newPrayers, deletedPrayers });
});

// @desc    Fix Members
// @router  GET /api/fix/members
// @access  Private
const fixMembers = asyncHandler(async (req, res) => {
  const members = await Member.find();

  Promise.all(
    members.map(async (member) => {
      await member.save();
    })
  );
  res.status(200).json({ count: members.length, members });
});

// @desc    Fix Users
// @router  GET /api/fix/users
// @access  Private
const fixUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  Promise.all(
    users.map(async (user) => {
      await user.save();
    })
  );

  res.status(200).json(users);
});

module.exports = {
  fixMeetings,
  fixTalks,
  fixPrayers,
  fixMembers,
  fixUsers,
  resetTalks,
};

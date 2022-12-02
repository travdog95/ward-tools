const asyncHandler = require("express-async-handler");
const { endOfDay, startOfDay, parseISO } = require("date-fns");

const Member = require("../models/memberModel");
const SacramentMeeting = require("../models/sacramentMeetingModel");
const Talk = require("../models/talkModel");

// @desc    Import Speaker Data
// @router  POST /api/importData/speakerData
// @access  Private
const importSpeakerData = asyncHandler(async (req, res) => {
  const data = req.body;

  if (!data) {
    res.status(400);
    throw new Error("Please include data");
  }

  const membersNotFound = [];
  const meetingsFound = [];
  const meetingsNotFound = [];
  const talksCreated = [];
  const meetingsCreated = [];
  await Promise.all(
    data.map(async (speaker) => {
      let meeting = {};
      let talkSacramentMeeting = {};

      //Parse name
      const lastName = speaker.Name.substring(0, speaker.Name.indexOf(","));
      const firstName = speaker.Name.substring(speaker.Name.indexOf(",") + 2);

      //Find member
      const member = await Member.find({
        firstName: { $regex: ".*" + firstName + ".*" },
        lastName,
      });

      if (member.length === 0) {
        membersNotFound.push(`${firstName} ${lastName}`);
      } else {
        const year = speaker.Date.substring(speaker.Date.lastIndexOf("/") + 1);
        const month = speaker.Date.substring(0, speaker.Date.indexOf("/")).padStart(2, "0");
        const day = speaker.Date.substring(
          speaker.Date.indexOf("/") + 1,
          speaker.Date.lastIndexOf("/")
        ).padStart(2, "0");
        const meetingDate = `${year}-${month}-${day}`;

        //Find sacrament meeting
        meeting = await SacramentMeeting.findOne({
          date: {
            $gte: startOfDay(parseISO(meetingDate)),
            $lte: endOfDay(parseISO(meetingDate)),
          },
        });

        if (!meeting) {
          //Create new meeting, if it doesn't exist
          meetingsNotFound.push(speaker);
          const newMeeting = await SacramentMeeting.create({ date: meetingDate });
          talkSacramentMeeting = newMeeting;
          meetingsCreated.push(newMeeting);
        } else {
          meetingsFound.push(speaker);
          talkSacramentMeeting = meeting;
        }

        //Create talk
        const newTalk = await Talk.create({
          member: member[0],
          sacramentMeeting: talkSacramentMeeting,
        });

        talksCreated.push(newTalk);
      }
    })
  );

  res.status(201).json({
    messsage: "Import completed successfully!",
    meetingsFound,
    meetingsNotFound,
    membersNotFound,
    talksCreated,
    meetingsCreated,
  });
});

module.exports = {
  importSpeakerData,
};

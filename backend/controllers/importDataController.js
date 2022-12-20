const asyncHandler = require("express-async-handler");
const { endOfDay, startOfDay, parseISO, isSunday } = require("date-fns");

const { SHORT_MONTHS } = require("../config/constants");
const Member = require("../models/memberModel");
const SacramentMeeting = require("../models/sacramentMeetingModel");
const Talk = require("../models/talkModel");
const Prayer = require("../models/prayerModel");

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

// @desc    Import Prayer Data
// @router  POST /api/importData/prayerData
// @access  Private
const importPrayerData = asyncHandler(async (req, res) => {
  const data = req.body;
  const prayersCreated = [];
  const meetingsCreated = [];
  const errorsCreatingMeetings = [];
  const errorsCreatingPrayers = [];

  if (!data || Object.keys(data).length === 0) {
    res.status(400);
    throw new Error("Please include data.");
  }

  await Promise.all(
    data.map(async (row) => {
      //find member
      const member = await Member.findOne({ preferredName: row.Name });

      row.memberMatch = member ? member._id : "no member match";

      if (member) {
        // let prayerDates = [];
        for (let i = 1; i <= row.Count; i++) {
          //Format date
          const year = parseInt(row[i].substring(row[i].lastIndexOf("-") + 1)) + 2000;

          const monthAbbreviation = row[i].substring(
            row[i].indexOf("-") + 1,
            row[i].lastIndexOf("-")
          );
          const month = SHORT_MONTHS.indexOf(monthAbbreviation);

          const day = parseInt(row[i].substring(0, row[i].indexOf("-")));

          const prayerDate = new Date(year, month, day);
          const formattedPrayerDate = `${year}-${month + 1}-${day}`;

          // Find sacrament meeting
          const meeting = await SacramentMeeting.findOne({
            date: {
              $gte: startOfDay(prayerDate),
              $lte: endOfDay(prayerDate),
            },
          });

          //Determine prayer type
          const prayerType = meeting.prayers.length > 0 ? "Benediction" : "Invocation";

          //Load data for prayer
          let newPrayer = {
            member: member._id,
            date: prayerDate,
            prayerType,
          };

          //Load meeting
          if (meeting) {
            newPrayer.sacramentMeeting = meeting._id;
          } else {
            // //create new meeting
            // const newMeeting = await SacramentMeeting.create({
            //   date: prayerDate,
            // });

            // if (!newMeeting) {
            //   errorsCreatingMeetings.push(formattedPrayerDate);
            // } else {
            //   newPrayer.sacramentMeeting = newMeeting._id;
            //   meetingsCreated.push(formattedPrayerDate);
            // }
            meetingsCreated.push(formattedPrayerDate);
          }

          //Add prayer
          const addPrayer = await Prayer.create(newPrayer);

          if (addPrayer) {
            prayersCreated.push(formattedPrayerDate);
          } else {
            errorsCreatingPrayers.push(formattedPrayerDate);
          }

          // prayerDates.push(meetingMatch);
        }

        // row.prayerDates = prayerDates;

        return row;
      } //End if (member)
    })
  );
  res.status(201).json({
    messsage: "Prayers imported completed successfully!",
    meetingsCreated,
    errorsCreatingMeetings,
    prayersCreated,
    errorsCreatingPrayers,
  });
});

module.exports = {
  importSpeakerData,
  importPrayerData,
};

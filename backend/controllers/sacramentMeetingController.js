const asyncHandler = require("express-async-handler");
const { isBefore, nextSunday, addWeeks, format } = require("date-fns");

const SacramentMeeting = require("../models/sacramentMeetingModel");
const Talk = require("../models/talkModel");
const Prayer = require("../models/prayerModel");

const getSundays = (year) => {
  const sundays = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  let currentSunday = nextSunday(startDate);

  while (isBefore(currentSunday, endDate)) {
    sundays.push(currentSunday);
    currentSunday = addWeeks(currentSunday, 1);
  }

  return sundays;
};

// @desc    Get sacramentMeetings
// @router  GET /api/sacramentmeetings/year/:year
// @access  Private
const getSacramentMeetingsByYear = asyncHandler(async (req, res) => {
  let sacramentMeetings = [];
  const year = req.params.year;

  sacramentMeetings = await SacramentMeeting.find({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31`),
    },
  }).sort({ date: -1 });

  let sacramentMeetingsExtended = [];
  await Promise.all(
    sacramentMeetings.map(async (meeting) => {
      const talks = await Talk.find({ sacramentMeeting: meeting.id });
      const prayers = await Prayer.find({ sacramentMeeting: meeting.id });
      const newMeeting = { ...meeting._doc, ...{ talks, prayers } };
      sacramentMeetingsExtended.push(newMeeting);
    })
  );

  //resort sacrament meetings by date (descending), it gets jumbled up because of the async calls above
  sacramentMeetingsExtended.sort((a, b) => {
    let da = new Date(a.date);
    let db = new Date(b.date);
    return db - da;
  });

  const meetingsByYear = {};

  meetingsByYear[year] = sacramentMeetingsExtended;

  res.status(200).json(sacramentMeetingsExtended);
});

// @desc    Get sacramentMeetings
// @router  GET /api/sacramentmeetings/
// @access  Private
const getSacramentMeetings = asyncHandler(async (req, res) => {
  let sacramentMeetings = [];

  sacramentMeetings = await SacramentMeeting.find().sort({ date: -1 });

  //Load prayers and talks if ext query param is passed in
  if (req.query.ext) {
    let sacramentMeetingsExtended = [];
    await Promise.all(
      sacramentMeetings.map(async (meeting) => {
        const talks = await Talk.find({ sacramentMeeting: meeting.id });
        const prayers = await Prayer.find({ sacramentMeeting: meeting.id });
        const newMeeting = { ...meeting._doc, ...{ talks, prayers } };
        sacramentMeetingsExtended.push(newMeeting);
      })
    );

    //resort sacrament meetings by date (descending), it gets jumbled up because of the async calls above
    sacramentMeetingsExtended.sort((a, b) => {
      let da = new Date(a.date);
      let db = new Date(b.date);
      return db - da;
    });

    sacramentMeetings = sacramentMeetingsExtended;
  }

  res.status(200).json(sacramentMeetings);
});

// @desc    Get sacramentMeeting
// @router  GET /api/sacramentmeetings/:id
// @access  Private
const getSacramentMeeting = asyncHandler(async (req, res) => {
  const sacramentMeeting = await SacramentMeeting.findById(req.params.id);

  res.status(200).json(sacramentMeeting);
});

// @desc    Add sacramentMeeting
// @router  POST /api/sacramentmeetings
// @access  Private
const addSacramentMeeting = asyncHandler(async (req, res) => {
  if (!req.body.date) {
    res.status(400);
    throw new Error("Please add date");
  }

  const sacramentMeeting = await SacramentMeeting.create({
    theme: req.body.theme,
    date: req.body.date,
  });

  res.status(200).json(sacramentMeeting);
});

// @desc    Update sacramentMeeting
// @router  PUT /api/sacramentmeetings/:id
// @access  Private
const updateSacramentMeeting = asyncHandler(async (req, res) => {
  const sacramentMeeting = await SacramentMeeting.findById(req.params.id);

  if (!sacramentMeeting) {
    res.status(400);
    throw new Error("Sacrament Meeting not found");
  }

  const updatedSacramentMeeting = await SacramentMeeting.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedSacramentMeeting);
});

// @desc    Patch sacramentMeeting
// @router  PATCH /api/sacramentmeetings/:id
// @access  Private
const patchSacramentMeeting = asyncHandler(async (req, res) => {
  const sacramentMeeting = await SacramentMeeting.findById(req.params.id);

  if (!sacramentMeeting) {
    res.status(400);
    throw new Error("Sacrament Meeting not found");
  }

  const patchedSacramentMeeting = await SacramentMeeting.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(patchedSacramentMeeting);
});

// @desc    Delete sacramentMeeting
// @router  DELETE /api/sacramentmeetings/:id
// @access  Private
const deleteSacramentMeeting = asyncHandler(async (req, res) => {
  const sacramentMeeting = await SacramentMeeting.findById(req.params.id);

  if (!sacramentMeeting) {
    res.status(400);
    throw new Error("Sacrament Meeting not found");
  }

  await sacramentMeeting.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc    Add sacramentMeetings by year
// @router  POST /api/sacramentmeetings/year/:year
// @access  Private
const addSacramentMeetingsByYear = asyncHandler(async (req, res) => {
  const year = req.params.year;
  const sundays = getSundays(year);
  const sacramentMeetings = [];

  await Promise.all(
    sundays.map(async (sunday) => {
      //Check to see if meeting exists
      const meetingExists = await SacramentMeeting.find({
        date: format(sunday, "yyyy-LL-dd"),
      });

      //If meeting doesn't exist, create it
      if (meetingExists.length === 0) {
        const sacramentMeeting = await SacramentMeeting.create({
          theme: "",
          date: sunday,
        });

        sacramentMeetings.push(sacramentMeeting);
      }
    })
  );

  res.status(200).json(sacramentMeetings);
});

// @desc    Delete sacramentMeetings by year
// @router  DELETE /api/sacramentmeetings/year/:year
// @access  Private
const deleteSacramentMeetingsByYear = asyncHandler(async (req, res) => {
  const year = req.params.year;

  const results = await SacramentMeeting.remove({
    date: {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31`),
    },
  });

  res.status(200).json(results);
});

module.exports = {
  getSacramentMeetings,
  getSacramentMeetingsByYear,
  addSacramentMeeting,
  updateSacramentMeeting,
  patchSacramentMeeting,
  deleteSacramentMeeting,
  getSacramentMeeting,
  addSacramentMeetingsByYear,
  deleteSacramentMeetingsByYear,
};

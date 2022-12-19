//Making http request and sending the data back
import axios from "axios";

const MEETINGS_API_URL = "/api/sacramentmeetings/";
const TALKS_API_URL = "/api/talks/";
const PRAYERS_API_URL = "/api/prayers/";

//Get Meeting
const getMeeting = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(MEETINGS_API_URL + id, config);

  return response.data;
};

//Update Meeting
const updateMeeting = async (id, meeting, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(MEETINGS_API_URL + id, meeting, config);

  return response.data;
};

//Add Talk
const addTalk = async (talk, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(TALKS_API_URL, talk, config);

  return response.data;
};

//Delete Talk
const deleteTalk = async (talk, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const talkId = talk._id;

  const response = await axios.delete(TALKS_API_URL + talkId, config);

  return response.data;
};

//Update Talk
const updateTalk = async (id, talk, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(TALKS_API_URL + id, talk, config);

  return response.data;
};

//Get Meetings
const getMeetings = async (params, token) => {
  const { year, ext, month } = params;

  let url = MEETINGS_API_URL;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (!isNaN(year) && !isNaN(month)) {
    url += `year-month/${year}-${month}`;
  }

  if (!isNaN(year) && isNaN(month)) {
    url += `year/${year}`;
  }

  url = ext ? url + "?ext=true" : url;

  const response = await axios.get(url, config);

  return response.data;
};

//Add Meetings by year
const addMeetingsByYear = async (year, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //add meetings for each sunday in year
  const response = await axios.post(MEETINGS_API_URL + "year/" + year, year, config);

  return response.data;
};

//Delete Prayer
const deletePrayer = async (prayer, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const prayerId = prayer._id;

  const response = await axios.delete(PRAYERS_API_URL + prayerId, config);

  return response.data;
};

//Add Prayer
const addPrayer = async (prayer, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(PRAYERS_API_URL, prayer, config);

  return response.data;
};

const meetingsService = {
  getMeetings,
  getMeeting,
  updateMeeting,
  addTalk,
  deleteTalk,
  updateTalk,
  addMeetingsByYear,
  deletePrayer,
  addPrayer,
};

export default meetingsService;

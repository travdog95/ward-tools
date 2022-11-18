//Making http request and sending the data back
import axios from "axios";

const API_URL = "/api/sacramentmeetings/";

//Get SacramentMeetings by Member
const getSacramentMeetings = async (year, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "?year=" + year, config);

  return response.data;
};

//Get SacramentMeeting
const getSacramentMeeting = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + id, config);

  return response.data;
};

//Update SacramentMeeting
const updateSacramentMeeting = async (id, meeting, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, meeting, config);

  return response.data;
};

//Add Talk
const addTalk = async (talk, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post("/api/talks", talk, config);

  return response.data;
};

const sacramentMeetingsService = {
  getSacramentMeetings,
  getSacramentMeeting,
  updateSacramentMeeting,
  addTalk,
};

export default sacramentMeetingsService;

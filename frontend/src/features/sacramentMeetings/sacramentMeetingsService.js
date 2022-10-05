//Making http request and sending the data back
import axios from "axios";

const API_URL = "/api/sacramentmeetings/";

//Get SacramentMeetings by Member
const getSacramentMeetings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

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
const updateSacramentMeeting = async (id, talk, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, talk, config);

  return response.data;
};

const sacramentMeetingsService = {
  getSacramentMeetings,
  getSacramentMeeting,
  updateSacramentMeeting,
};

export default sacramentMeetingsService;

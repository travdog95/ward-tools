//Making http request and sending the data back
import axios from "axios";

const SPEAKERS_API_URL = "/api/speakers/";

//Get Speaker
const getSpeaker = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(SPEAKERS_API_URL + id, config);

  return response.data;
};

//Get Speakers
const getSpeakers = async (params, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(SPEAKERS_API_URL, config);

  return response.data;
};

const speakersService = {
  getSpeakers,
  getSpeaker,
};

export default speakersService;

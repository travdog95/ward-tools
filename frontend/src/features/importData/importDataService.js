//Making http request and sending the data back
import axios from "axios";

const API_URL = "/api/importData/";

//Import Speaker Data
const importSpeakerData = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "speakerData", data, config);

  return response.data;
};

//Import Prayer Data
const importPrayerData = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "prayerData", data, config);

  return response.data;
};

const importDataService = {
  importPrayerData,
  importSpeakerData,
};

export default importDataService;

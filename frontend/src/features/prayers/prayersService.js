//Making http request and sending the data back
import axios from "axios";

const API_URL = "/api/prayers/";

//Get Prayer
const getPrayer = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + id, config);

  return response.data;
};

//Get Prayers by member
const getPrayersByMember = async (memberId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/members/" + memberId + "/prayers/", config);

  return response.data;
};

//Add Prayer
const addPrayer = async (prayer, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, prayer, config);

  return response.data;
};

//Update Prayer
const updatePrayer = async (id, prayer, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, prayer, config);

  return response.data;
};

const prayersService = {
  getPrayer,
  updatePrayer,
  getPrayersByMember,
  addPrayer,
};

export default prayersService;

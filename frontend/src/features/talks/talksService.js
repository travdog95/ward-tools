//Making http request and sending the data back
import axios from "axios";

const API_URL = "/api/talks/";

//Get Talk
const getTalk = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + id, config);

  return response.data;
};

//Get Talks by member
const getTalksByMember = async (memberId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/members/" + memberId + "/talks/", config);

  return response.data;
};

//Add Talk
const addTalk = async (talk, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, talk, config);

  return response.data;
};

//Update Talk
const updateTalk = async (id, talk, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, talk, config);

  return response.data;
};

const talksService = {
  getTalk,
  updateTalk,
  getTalksByMember,
  addTalk,
};

export default talksService;

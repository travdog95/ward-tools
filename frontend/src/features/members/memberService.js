//Making http request and sending the data back
import axios from "axios";

const API_URL = "/api/members/";

//Get Members
const getMembers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

//Get Member
const getMember = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + id, config);

  return response.data;
};

//Update Member
const updateMember = async (id, member, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, member, config);

  return response.data;
};

const membersService = {
  getMembers,
  getMember,
  updateMember,
};

export default membersService;

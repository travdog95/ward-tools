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

const membersService = {
  getMembers,
};

export default membersService;

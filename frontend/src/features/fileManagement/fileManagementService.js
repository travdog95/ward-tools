//Making http request and sending the data back
import axios from "axios";

const API_URL = "/api/files/";

//Upload file
const upload = async (formData, config) => {
  const response = await axios.post(API_URL, formData, config);

  return response.data;
};

const getFiles = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const fileManagementService = {
  upload,
  getFiles,
};

export default fileManagementService;

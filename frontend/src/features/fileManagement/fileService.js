//Making http request and sending the data back
import axios from "axios";

const API_URL = "/api/files/";

//Upload file
const upload = async (formData, config) => {
  const response = await axios.post(API_URL, formData, config);

  return response.data;
};

//Get Files
const getFiles = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

//Get Files
const deleteFile = async (file, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + file, config);

  return response.data;
};

//Get Files
const preview = async (file, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + file, config);

  return response.data;
};

const fileManagementService = {
  upload,
  getFiles,
  deleteFile,
  preview,
};

export default fileManagementService;

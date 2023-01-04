//Making http request and sending the data back
import axios from "axios";

const API_URL = "/api/files/";
const FILE_INFO_URL = "/api/fileinfo/";

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

//Get FileInfo
const getFileInfo = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(FILE_INFO_URL, config);

  return response.data;
};

//Add FileInfo
const addFileInfo = async (fileInfo, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(FILE_INFO_URL, fileInfo, config);

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

//Import data
const importData = async (file, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "import/", file, config);

  return response.data;
};

const fileManagementService = {
  upload,
  getFiles,
  deleteFile,
  preview,
  importData,
  addFileInfo,
  getFileInfo,
};

export default fileManagementService;

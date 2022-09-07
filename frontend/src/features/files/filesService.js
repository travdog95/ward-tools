//Making http request and sending the data back
import axios from "axios";

const API_URL = "/api/files/";

//Upload file
const uploadFile = async (formData, config) => {
  console.log("filesService");
  const response = await axios.post(API_URL, formData, config);

  return response.data;
};

const filesService = {
  uploadFile,
};

export default filesService;

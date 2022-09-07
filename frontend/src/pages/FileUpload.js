import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../features/files/filesSlice";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  // const messageRef = useRef();

  const handleFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("dataFile", selectedFile);
    formData.append("fileName", selectedFile.name);

    // Details of the uploaded file
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    // dispatch(uploadFile(formData, config));
    const response = await axios.post("http://localhost:5000/api/files", formData, config);
    console.log("response", response.data);
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {selectedFile.name}</p>

          <p>File Type: {selectedFile.type}</p>

          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    }
  };

  const showButton = () => {
    if (selectedFile) {
      return (
        <div className="form-group">
          <button className="btn btn-block" onClick={handleFileUpload}>
            Upload File
          </button>
        </div>
      );
    }
  };

  return (
    <div className="form">
      <form>
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            name="jsonFile"
            id="jsonFile"
            onChange={handleFileChange}
          />
          {showButton()}
          {fileData()}
        </div>
      </form>
    </div>
  );
};

export default FileUpload;

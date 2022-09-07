import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadFile, reset } from "../features/fileManagement/fileManagementSlice";
import Spinner from "../components/Spinner";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  // const naviagate = useNavigate();

  const { file, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.fileManagement
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }

    dispatch(reset());
  }, [file, isError, isSuccess, message, dispatch]);

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

    dispatch(uploadFile(formData, config));
  };

  if (isLoading) {
    return <Spinner />;
  }

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

  const uploadedFileData = () => {
    if (file) {
      return (
        <div>
          <h2>Uploaded File Details</h2>
          <p>New File Name: {file.filename}</p>
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
          {uploadedFileData()}
        </div>
      </form>
    </div>
  );
};

export default FileUpload;

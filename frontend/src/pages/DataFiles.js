import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadFile, reset, getFiles } from "../features/fileManagement/fileManagementSlice";
import Spinner from "../components/Spinner";
import SelectedFile from "../features/fileManagement/components/SelectedFile";
import UploadFileButton from "../features/fileManagement/components/UploadFileButton";
import FileDetails from "../features/fileManagement/components/FileDetails";
import FilesTable from "../features/fileManagement/components/FilesTable";

const DataFiles = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  // const naviagate = useNavigate();

  const { files, file, isLoading, isError, isSuccess, message } = useSelector(
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

  //Get list of files from uploads folder
  useEffect(() => {
    console.log("useEffect");
    dispatch(getFiles());
  }, [dispatch]);

  const handleFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadFile = async (e) => {
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
          {selectedFile ? <UploadFileButton onClick={handleUploadFile} /> : null}
        </div>
      </form>
      {selectedFile ? <SelectedFile data={selectedFile} /> : null}
      {file ? <FileDetails file={file} /> : null}
      <FilesTable files={files} />
    </div>
  );
};

export default DataFiles;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
import { uploadFile } from "../features/fileManagement/fileSlice";
import SelectedFile from "../features/fileManagement/components/SelectedFile";
import UploadFileButton from "../features/fileManagement/components/UploadFileButton";
import FilesTable from "../features/fileManagement/components/FilesTable";
import PreviewFile from "../features/fileManagement/components/PreviewFile";

const DataFiles = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { files, isLoading, isError, message, isSuccess, previewFile, fileInformation } =
    useSelector((state) => state.fileManagement);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && message) {
      toast.success(message);
    }

    if (!user) {
      navigate("/login");
    }

    // dispatch(getFiles());

    // return () => {
    //   dispatch(reset());
    // };
  }, [user, navigate, message, isError, isSuccess]);

  const handleFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadFile = (e) => {
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
    <>
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
      </div>
      {selectedFile ? <SelectedFile data={selectedFile} /> : null}
      <FilesTable files={files} fileInformation={fileInformation} />
      {previewFile.data.length > 0 ? <PreviewFile file={previewFile} /> : null}
    </>
  );
};

export default DataFiles;

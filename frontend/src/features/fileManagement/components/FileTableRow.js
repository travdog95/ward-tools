import { useDispatch } from "react-redux";
import FileRowButtons from "./FileRowButtons";
import { deleteFile } from "../../../features/fileManagement/fileManagementSlice";

const FileTableRow = ({ file }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    console.log("delete clicked");
    dispatch(deleteFile(file));
  };

  const handlePreview = () => {
    console.log("Preview clicked");
  };

  return (
    <div className="file-row">
      <div className="file-name">{file}</div>
      <FileRowButtons onClickDelete={handleDelete} onClickPreview={handlePreview} />
    </div>
  );
};

export default FileTableRow;

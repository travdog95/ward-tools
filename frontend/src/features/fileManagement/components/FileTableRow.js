import { useDispatch } from "react-redux";
import FileRowButtons from "./FileRowButtons";
import { deleteFile, previewFile } from "../fileSlice";

const FileTableRow = ({ file }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteFile(file));
  };

  const handlePreview = () => {
    dispatch(previewFile(file));
  };

  return (
    <div className="file-row">
      <div className="file-name">{file}</div>
      <FileRowButtons onClickDelete={handleDelete} onClickPreview={handlePreview} />
    </div>
  );
};

export default FileTableRow;

import { useState } from "react";
import { useDispatch } from "react-redux";

import FileRowButtons from "./FileRowButtons";
import { deleteFile, previewFile } from "../fileSlice";
import ConfirmationDialog from "../../../components/ConfirmationDialog";

const FileTableRow = ({ file }) => {
  const title = "Confirm File Import";
  const message = "Are you sure you want to import data into Members table?";
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteFile(file));
  };

  const handlePreview = () => {
    dispatch(previewFile(file));
  };

  const handleConfirmImport = () => {
    //confirm import
    setOpen(true);
  };

  const handleImport = () => {
    console.log("handle import");
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="file-row">
        <div className="file-name">{file}</div>
        <FileRowButtons
          onClickDelete={handleDelete}
          onClickPreview={handlePreview}
          onClickConfirmImport={handleConfirmImport}
        />
      </div>
      <ConfirmationDialog
        open={open}
        title={title}
        message={message}
        onConfirm={handleImport}
        onCancel={handleCancel}
      />
    </>
  );
};

export default FileTableRow;

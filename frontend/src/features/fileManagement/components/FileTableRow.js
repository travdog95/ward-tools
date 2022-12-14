import { useState } from "react";
import { useDispatch } from "react-redux";

import FileRowButtons from "./FileRowButtons";
import { deleteFile, previewFile, importDataFile } from "../fileSlice";
import ConfirmationDialog from "../../../components/ConfirmationDialog";

const FileTableRow = ({ file }) => {
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialog, setDialog] = useState("");

  const dispatch = useDispatch();

  const handleConfirmDelete = () => {
    //confirm delete
    setDialog("delete");
    setDialogTitle("Confirm Delete File");
    setDialogMessage("Are you sure you want to delete file?");
    setOpen(true);
  };

  const handlePreview = () => {
    dispatch(previewFile(file));
  };

  const handleConfirmImport = () => {
    //confirm import
    setDialog("import");
    setDialogTitle("Confirm File Import");
    setDialogMessage("Are you sure you want to import data into Members table?");
    setOpen(true);
  };

  const handleConfirm = () => {
    if (dialog === "import") dispatch(importDataFile({ filename: file }));

    if (dialog === "delete") dispatch(deleteFile(file));
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="file-row">
        <div className="file-name">{file}</div>
        <FileRowButtons
          onClickDelete={handleConfirmDelete}
          onClickPreview={handlePreview}
          onClickConfirmImport={handleConfirmImport}
        />
      </div>
      <ConfirmationDialog
        open={open}
        title={dialogTitle}
        message={dialogMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};

export default FileTableRow;

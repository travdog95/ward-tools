import { useState } from "react";
import { useDispatch } from "react-redux";

import ConfirmationDialog from "../../../components/ConfirmationDialog";

const MembersTableRow = ({ member }) => {
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

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {};

  return (
    <>
      <div className="file-row">
        <div className="file-name">{member.memberId}</div>
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

export default MembersTableRow;

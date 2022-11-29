import React from "react";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

const AutoUpdateTextField = (props) => {
  const {
    id,
    textFieldId,
    variant,
    value,
    placeholder,
    onChange,
    onBlur,
    updating,
    idBeingUpdated,
    textFieldClassName,
  } = props;

  return (
    <div className="auto-update-text-field-container">
      <TextField
        id={textFieldId}
        variant={variant}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={textFieldClassName}
      />
      <div className="auto-update-text-field-saving-indicator">
        {updating && idBeingUpdated === id ? <CircularProgress size={20} /> : null}
      </div>
    </div>
  );
};

export default AutoUpdateTextField;

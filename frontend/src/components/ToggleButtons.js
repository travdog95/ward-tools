import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const ToggleButtons = (props) => {
  const { value, onChange, label, updating, idBeingUpdated, id } = props;
  return (
    <>
      <ToggleButtonGroup
        size="small"
        value={value}
        exclusive
        onChange={onChange}
        aria-label={label}
      >
        <ToggleButton value={true}>Yes</ToggleButton>
        <ToggleButton value={false}>No</ToggleButton>
      </ToggleButtonGroup>
      <div className="auto-update-text-field-saving-indicator">
        {updating && idBeingUpdated === id ? <CircularProgress size={20} /> : null}
      </div>
    </>
  );
};

export default ToggleButtons;

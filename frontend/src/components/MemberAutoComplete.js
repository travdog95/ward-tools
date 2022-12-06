import React from "react";
import AutoComplete from "@mui/material/AutoComplete";
import TextField from "@mui/material/TextField";

const MemberAutoComplete = (props) => {
  const { member, members, onChange, label, className, size } = props;

  //Default size to small
  const controlSize = size ? size : "small";

  return (
    <AutoComplete
      options={members}
      size={controlSize}
      getOptionLabel={(option) => option.preferredName}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(event, newValue) => onChange(newValue)}
      value={member}
      className={className}
    />
  );
};

export default MemberAutoComplete;
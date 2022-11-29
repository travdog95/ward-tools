import React from "react";
import MemberAutoComplete from "../../../components/MemberAutoComplete";
const Prayer = (props) => {
  const { label, members, onChange, className, member } = props;

  return (
    <MemberAutoComplete
      member={member}
      members={members}
      onChange={onChange}
      label={label}
      className={className}
    />
  );
};

export default Prayer;

import React from "react";

import MembersTableRow from "./MembersTableRow";

const MembersTable = (props) => {
  const { members } = props;
  return (
    <>
      <h2>Members</h2>
      {members.map((member, index) => {
        return <MembersTableRow key={index} member={member} />;
      })}
    </>
  );
};

export default MembersTable;

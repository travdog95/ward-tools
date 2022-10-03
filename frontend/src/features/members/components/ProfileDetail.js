import React from "react";

const ProfileDetail = (props) => {
  const { member } = props;
  return (
    <div className="profile-info">
      <div className="info-row">
        <div className="label">Talks</div>
        <div className="profile-details">
          <div>Tithing - 24-Sep-2022</div>
          <div>Tithing - 24-Sep-2022</div>
          <div>Tithing - 24-Sep-2022</div>
          <div>Tithing - 24-Sep-2022</div>
          <div>Tithing - 24-Sep-2022</div>
        </div>
      </div>
      <div className="info-row">
        <div className="label">Prayers</div>
        <div className="info"></div>
      </div>
      <div className="info-row">
        <div className="label">Tithing Declarations</div>
        <div className="info"></div>
      </div>
    </div>
  );
};

export default ProfileDetail;

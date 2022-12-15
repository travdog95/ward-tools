// import { useState } from "react";
// import TextField from "@mui/material/TextField";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import MemberProfileTalk from "../../talks/MemberProfileTalk";
import MemberProfilePrayer from "../../prayers/MemberProfilePrayer";

const ProfileDetail = (props) => {
  const { memberId } = props;
  // const [value, setValue] = useState(new Date());

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };

  return (
    <div className="profile-info">
      <div className="info-row">
        <div className="label">Talks</div>
        <div className="profile-details">
          <MemberProfileTalk memberId={memberId} />
        </div>
      </div>
      <div className="info-row">
        <div className="label">Prayers</div>
        <div className="profile-details">
          <MemberProfilePrayer memberId={memberId} />
        </div>
      </div>
      {/* <div className="info-row">
        <div className="label">Tithing Declarations</div>
        <div className="info">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              disableMaskedInput
              inputFormat="d-LLL-yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
              showDaysOutsideCurrentMonth
            />
          </LocalizationProvider>
        </div>
      </div> */}
    </div>
  );
};

export default ProfileDetail;

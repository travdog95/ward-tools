import { useState } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const ProfileDetail = (props) => {
  const { member } = props;

  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

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
      </div>
    </div>
  );
};

export default ProfileDetail;

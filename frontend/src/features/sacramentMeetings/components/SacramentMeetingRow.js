import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

import { updateSacramentMeeting } from "./sacramentMeetingSlice";
import { formatDate } from "../../../utils/helpers";

const SacramentMeetingRow = ({ meeting }) => {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(meeting.theme);
  const [updatedTheme, setUpdatedTheme] = useState(meeting.theme);
  const [loadingMeetingId, setLoadingMeetingId] = useState(null);

  const { isLoading, isError, message } = useSelector((state) => state.sacramentMeeting);

  const handleOnThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleOnThemeBlur = (e) => {
    const newTheme = e.target.value;
    if (updatedTheme !== newTheme) {
      setUpdatedTheme(newTheme);
      setLoadingMeetingId(meeting._id);
      dispatch(updateSacramentMeeting({ id: meeting._id, theme: newTheme }));
    }
  };

  if (!isLoading && loadingMeetingId) {
    setLoadingMeetingId(null);
  }

  return (
    <div className="sacrament-meeting-row">
      <div className="sacrament-meeting">
        <div className="sacrament-meeting-date">
          {formatDate(meeting.date.substring(0, 10), "LLL d")}
        </div>
        <div className="sacrament-meeting-theme">
          <TextField
            id="theme"
            variant="standard"
            value={theme}
            placeholder="Theme"
            onChange={handleOnThemeChange}
            onBlur={handleOnThemeBlur}
          />
          {isLoading && loadingMeetingId === meeting._id ? <CircularProgress size={20} /> : null}
        </div>
      </div>
      <div className="sacrament-meeting-talks">
        {meeting.talks.map((talk, index) => {
          return (
            <div key={index} className="sacrament-meeting-talk">
              {talk.talkType} - {talk.member.firstName} {talk.member.lastName} -
              {talk.topic ? talk.topic : "no topic"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SacramentMeetingRow;

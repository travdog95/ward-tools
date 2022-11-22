import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";

import { updateMeeting } from "../../meetings/meetingsSlice";
import AddTalk from "./AddTalk";
import TalkRow from "./TalkRow";
import { formatDate } from "../../../utils/helpers";

const SacramentMeetingRow = ({ meeting }) => {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(meeting.theme);
  const [updatedTheme, setUpdatedTheme] = useState(meeting.theme);

  const { isError, message, updatingMeeting, currentMeetingId } = useSelector(
    (state) => state.meetings
  );
  const { members } = useSelector((state) => state.members);

  const handleOnThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleOnThemeBlur = (e) => {
    const newTheme = e.target.value;
    if (updatedTheme !== newTheme) {
      setUpdatedTheme(newTheme);
      dispatch(updateMeeting({ id: meeting._id, theme: newTheme }));
    }
  };

  if (isError) {
    console.error("Error loading sacrament meeting.", message);
    return "Error";
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
          <div className="sacrament-meeting-saving-indicator">
            {updatingMeeting && currentMeetingId === meeting._id ? (
              <CircularProgress size={20} />
            ) : null}
          </div>
        </div>
      </div>
      <div className="sacrament-meeting-talks-container">
        <div className="sacrament-meeting-add-talk">
          <AddTalk meeting={meeting} />
        </div>
        <div className="sacrament-meeting-talks">
          {meeting.talks.map((talk, index) => {
            const member = members.filter((m) => m._id === talk.member);
            return <TalkRow key={index} talk={talk} member={member[0]} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SacramentMeetingRow;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

import { updateSacramentMeeting } from "../sacramentMeetingsSlice.js";
import AddTalk from "../components/AddTalk";
import { formatDate } from "../../../utils/helpers";

const SacramentMeetingRow = ({ meeting }) => {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(meeting.theme);
  const [updatedTheme, setUpdatedTheme] = useState(meeting.theme);
  const [loadingMeetingId, setLoadingMeetingId] = useState(null);

  const { isLoading, isError, message } = useSelector((state) => state.sacramentMeetings);
  const { members } = useSelector((state) => state.members);

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
          <div className="sacrament-meeting-saving-indicator">
            {isLoading && loadingMeetingId === meeting._id ? <CircularProgress size={20} /> : null}
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
            return (
              <div key={index} className="sacrament-meeting-talk">
                {talk.talkType} - {member[0].firstName} {member[0].lastName} -
                {talk.topic ? talk.topic : "no topic"}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SacramentMeetingRow;

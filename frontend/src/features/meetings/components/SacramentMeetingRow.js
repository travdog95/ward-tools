import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AutoUpdateTextField from "../../../components/AutoUpdateTextField";
import { updateMeeting } from "../meetingsSlice";
import AddTalk from "./AddTalk";
import TalkRow from "./TalkRow";
import AddPrayer from "./AddPrayer";
import PrayerRow from "./PrayerRow";
import { formatDate, getMeetingPrayers } from "../../../utils/helpers";

const SacramentMeetingRow = ({ meeting }) => {
  const dispatch = useDispatch();

  const { isError, message, updatingMeeting, currentMeetingId } = useSelector(
    (state) => state.meetings
  );
  const { allIds, byId } = useSelector((state) => state.members);
  const members = allIds.map((memberId) => {
    return byId[memberId];
  });

  const { invocation, memberInvocation, benediction, memberBenediction } = getMeetingPrayers(
    members,
    meeting
  );

  const [theme, setTheme] = useState(meeting.theme);
  const [oldTheme, setOldTheme] = useState(meeting.theme);

  const handleOnThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleOnThemeBlur = (e) => {
    const newTheme = e.target.value;
    if (oldTheme !== newTheme) {
      setOldTheme(newTheme);
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
        <AutoUpdateTextField
          textFieldId="theme"
          variant="standard"
          value={theme}
          placeholder="Theme"
          onChange={handleOnThemeChange}
          onBlur={handleOnThemeBlur}
          updating={updatingMeeting}
          idBeingUpdated={currentMeetingId}
          id={meeting._id}
          textFieldClassName="sacrament-meeting-theme"
        />
      </div>
      <div className="sacrament-meeting-details-container">
        <div className="sacrament-meeting-prayer-container">
          <div className="sacrament-meeting-add-talk">
            <AddPrayer meeting={meeting} type="Invocation" />
          </div>
          <div className="sacrament-meeting-prayers">
            {invocation && <PrayerRow prayer={invocation} member={memberInvocation} />}
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
        <div className="sacrament-meeting-prayer-container">
          <div className="sacrament-meeting-add-talk">
            <AddPrayer meeting={meeting} type="Benediction" />
          </div>
          <div className="sacrament-meeting-prayers">
            {benediction && <PrayerRow prayer={benediction} member={memberBenediction} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SacramentMeetingRow;

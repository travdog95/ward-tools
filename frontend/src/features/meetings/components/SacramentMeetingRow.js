import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AutoUpdateTextField from "../../../components/AutoUpdateTextField";
import { updateMeeting, updatePrayer, addPrayer } from "../meetingsSlice";
import AddTalk from "./AddTalk";
import TalkRow from "./TalkRow";
import Prayer from "./Prayer";
import { formatDate, getMeetingPrayers } from "../../../utils/helpers";

const SacramentMeetingRow = ({ meeting }) => {
  const dispatch = useDispatch();

  const { isError, message, updatingMeeting, currentMeetingId } = useSelector(
    (state) => state.meetings
  );
  const { members } = useSelector((state) => state.members);

  const { invocation, memberInvocation, benediction, memberBenediction } = getMeetingPrayers(
    members,
    meeting
  );

  const [theme, setTheme] = useState(meeting.theme);
  const [oldTheme, setOldTheme] = useState(meeting.theme);
  const [meetingMemberInvocation, setInvocation] = useState(memberInvocation);
  const [meetingMemberBenediction, setBenediction] = useState(memberBenediction);

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

  const handleInvocation = (value) => {
    if (meetingMemberInvocation) {
      dispatch(updatePrayer({ id: invocation._id, member: value._id }));
    } else {
      dispatch(
        addPrayer({ member: value._id, sacramentMeeting: meeting._id, prayerType: "Invocation" })
      );
    }
    setInvocation(value);
  };

  const handleBenediction = (value) => {
    if (meetingMemberBenediction) {
      dispatch(updatePrayer({ id: benediction._id, member: value._id }));
    } else {
      dispatch(
        addPrayer({ member: value._id, sacramentMeeting: meeting._id, prayerType: "Benediction" })
      );
    }

    setBenediction(value);
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
          <Prayer
            members={members}
            member={meetingMemberInvocation}
            label="Invocation"
            onChange={handleInvocation}
            className=""
          />
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
          <Prayer
            members={members}
            member={meetingMemberBenediction}
            label="Benediction"
            onChange={handleBenediction}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default SacramentMeetingRow;

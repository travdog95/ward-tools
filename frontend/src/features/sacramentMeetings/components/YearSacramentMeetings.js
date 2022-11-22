import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMeetingsByYear } from "../../meetings/meetingsSlice";
import SacramentMeetingRow from "./SacramentMeetingRow";
import "./sacramentMeeting.css";

const YearSacramentMeetings = ({ year }) => {
  const dispatch = useDispatch();
  const { meetings, isLoading, isError, message } = useSelector((state) => state.meetings);

  useEffect(() => {
    dispatch(getMeetingsByYear(year));
  }, [dispatch, year]);

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    console.error("Error loading sacrament meetings", message);
    return "Error";
  }

  return (
    <>
      <div className="sacrament-meeting-container">
        {meetings.allIds.map((meetingId, index) => {
          return <SacramentMeetingRow key={index} meeting={meetings.byId[meetingId]} />;
        })}
      </div>
    </>
  );
};

export default YearSacramentMeetings;

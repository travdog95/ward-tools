import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMeetingsByYear, addMeetingsByYear } from "../meetingsSlice";
import SacramentMeetingRow from "./SacramentMeetingRow";
import "./sacramentMeeting.css";

const YearSacramentMeetings = ({ year }) => {
  const dispatch = useDispatch();
  const { meetings, isLoading, isError, message, addingMeetings } = useSelector(
    (state) => state.meetings
  );

  useEffect(() => {
    dispatch(getMeetingsByYear(year));
  }, [dispatch, year]);

  const addMeetings = () => {
    dispatch(addMeetingsByYear(year)).then(() => dispatch(getMeetingsByYear(year)));
  };

  if (addingMeetings) {
    return "Adding meetings...";
  }

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    console.error("Error loading sacrament meetings", message);
    return "Error";
  }

  return (
    <>
      <div className="sacrament-meetings-container">
        {meetings.allIds.map((meetingId, index) => {
          return <SacramentMeetingRow key={index} meeting={meetings.byId[meetingId]} />;
        })}

        {meetings.allIds.length === 0 ? (
          <>
            <button className="btn" onClick={addMeetings}>
              Add Meetings
            </button>
          </>
        ) : null}
      </div>
    </>
  );
};

export default YearSacramentMeetings;

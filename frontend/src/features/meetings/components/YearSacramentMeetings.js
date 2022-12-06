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
    if (!meetings.idsByYear[year]) {
      dispatch(getMeetingsByYear({ year, ext: true }));
    }
  }, [dispatch, year, meetings.idsByYear]);

  const addMeetings = () => {
    dispatch(addMeetingsByYear(year)).then(() => dispatch(getMeetingsByYear({ year, ext: true })));
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
        {meetings.idsByYear[year] &&
          meetings.idsByYear[year].map((meetingId, index) => {
            return <SacramentMeetingRow key={index} meeting={meetings.byId[meetingId]} />;
          })}

        {meetings.idsByYear[year] && meetings.idsByYear[year].length === 0 ? (
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
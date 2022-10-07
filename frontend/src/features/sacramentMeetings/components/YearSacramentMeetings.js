import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";

import { getSacramentMeetings } from "../sacramentMeetingsSlice";
import SacramentMeetingRow from "./SacramentMeetingRow";
import "./sacramentMeeting.css";

const YearSacramentMeetings = ({ year }) => {
  const dispatch = useDispatch();
  const { sacramentMeetings, isLoading, isError, message } = useSelector(
    (state) => state.sacramentMeetings
  );
  useEffect(() => {
    dispatch(getSacramentMeetings(year));
  }, [dispatch, year]);

  const handleAddMeeting = () => {
    // dispatch(addSacramentMeeting);
  };

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
        <Button variant="contained" onClick={handleAddMeeting}>
          Add Sacrament Meetings
        </Button>
        {sacramentMeetings.map((meeting, index) => {
          return <SacramentMeetingRow key={index} meeting={meeting} />;
        })}
      </div>
    </>
  );
};

export default YearSacramentMeetings;

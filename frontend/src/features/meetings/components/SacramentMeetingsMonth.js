import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SacramentMeetingRow from "./SacramentMeetingRow";
import { getMeetings } from "../meetingsSlice";

const SacramentMeetingsMonth = (props) => {
  const { month, year } = props;
  const dispatch = useDispatch();

  const { meetings, isLoading, isError, message } = useSelector((state) => state.meetings);

  useEffect(() => {
    dispatch(getMeetings({ month: month + 1, year, ext: true }));
  }, [dispatch, year, month]);

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    console.error("Error loading sacrament meetings", message);
    return "Error";
  }

  return (
    <>
      {meetings.byId &&
        meetings.allIds.map((meetingId, index) => {
          return <SacramentMeetingRow key={index} meeting={meetings.byId[meetingId]} />;
        })}
    </>
  );
};

export default SacramentMeetingsMonth;

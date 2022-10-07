import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSacramentMeetings } from "../sacramentMeetingsSlice";
import { formatDate } from "../../../utils/helpers";

const YearSacramentMeetings = ({ year }) => {
  const dispatch = useDispatch();
  const { sacramentMeetings } = useSelector((state) => state.sacramentMeetings);
  useEffect(() => {
    dispatch(getSacramentMeetings(year));
  }, [dispatch, year]);

  return (
    <>
      <div className="sacrament-meeting-container">
        {sacramentMeetings.map((meeting, index) => {
          return (
            <div className="sacrament-meeting-row" key={index}>
              <div className="sacrament-meeting">
                {formatDate(meeting.date, "LLL d")} {meeting.date} - {meeting.theme}
              </div>
              <div className="sacrament-meeting-talks">
                {meeting.talks.map((talk, index) => {
                  return (
                    <div key={index} className="talk">
                      {talk.talkType}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default YearSacramentMeetings;

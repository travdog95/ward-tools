import { useState } from "react";
import { useDispatch } from "react-redux";
import { Tabs, Tab, Box } from "@mui/material";
import { getMonth } from "date-fns";

import { setFilters } from "../meetingsSlice";
import { MONTHS_SHORT } from "../../../app/constants";
import SacramentMeetingsMonth from "./SacramentMeetingsMonth";
import "./sacramentMeeting.css";

const YearSacramentMeetings = ({ year }) => {
  const dispatch = useDispatch();

  const currentMonth = getMonth(new Date());
  const months = [];
  let i = 0;
  for (i; i < 12; i++) {
    months.push(i);
  }

  const [monthTabValue, setMonthTabValue] = useState(currentMonth);

  const handleMonthTabChange = (event, newValue) => {
    dispatch(setFilters({ year, month: newValue }));
    setMonthTabValue(newValue);
  };

  return (
    <>
      <div className="sacrament-meetings-container">
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={monthTabValue}
            onChange={handleMonthTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="Month Tabs"
            variant="scrollable"
            scrollButtons={true}
          >
            {months.map((month, index) => {
              return <Tab key={index} value={month} label={MONTHS_SHORT[month]} />;
            })}
          </Tabs>
          <SacramentMeetingsMonth
            month={monthTabValue}
            year={year}
            label={MONTHS_SHORT[monthTabValue]}
          />
        </Box>

        {/* {meetings.idsByYear[year] && meetings.idsByYear[year].length === 0 ? (
          <>
            <button className="btn" onClick={addMeetings}>
              Add Meetings
            </button>
          </>
        ) : null} */}
      </div>
    </>
  );
};

export default YearSacramentMeetings;

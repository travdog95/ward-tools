import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

import YearSacramentMeetings from "./YearSacramentMeetings";

const YearTabs = () => {
  const currentYear = new Date().getFullYear();
  const [tabValue, setTabValue] = useState(currentYear);

  let years = [];
  for (let y = 0; y < 6; y++) {
    const year = currentYear + 1 - y;
    years.push(year);
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="Year Tabs"
      >
        {years.map((year, index) => {
          return <Tab key={index} value={year} label={year} />;
        })}
      </Tabs>
      <YearSacramentMeetings year={tabValue} />
    </Box>
  );
};

export default YearTabs;

import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import YearSacramentMeetings from "./YearSacramentMeetings";
// import { formatDate } from "../../../utils/helpers";

const YearTabs = () => {
  const currentYear = new Date().getFullYear();
  const [tabValue, setTabValue] = useState(currentYear.toString());

  let years = [];
  for (let y = 0; y < 6; y++) {
    const year = currentYear + 1 - y;
    years.push(year.toString());
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

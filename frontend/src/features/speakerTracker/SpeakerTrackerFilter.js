import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const SpeakerTrackerFilter = (props) => {
  const { speakerTypeFilter, onChangeSpeakerType, willingFilter, onChangeWilling } = props;
  const toggleStyle = {
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: "1rem",
  };
  return (
    <div className="speaker-tracker-filters">
      <div className="speaker-tracker-filter-group">
        <div className="filter-label">Speaker Type</div>
        <ToggleButtonGroup
          value={speakerTypeFilter}
          exclusive
          onChange={onChangeSpeakerType}
          aria-label="speaker type"
          size="small"
        >
          <ToggleButton value="all" aria-label="all" sx={toggleStyle}>
            All
          </ToggleButton>
          <ToggleButton value="adult" aria-label="adult" sx={toggleStyle}>
            Adult
          </ToggleButton>
          <ToggleButton value="youth" aria-label="youth" sx={toggleStyle}>
            Youth
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="speaker-tracker-filter-group">
        <div className="filter-label">Willing to Speak</div>
        <ToggleButtonGroup
          value={willingFilter}
          exclusive
          onChange={onChangeWilling}
          aria-label="willing"
          size="small"
        >
          <ToggleButton value="all" aria-label="all" sx={toggleStyle}>
            All
          </ToggleButton>
          <ToggleButton value="yes" aria-label="yes" sx={toggleStyle}>
            Yes
          </ToggleButton>
          <ToggleButton value="no" aria-label="no" sx={toggleStyle}>
            No
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export default SpeakerTrackerFilter;

import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const SpeakerTrackerFilter = (props) => {
  const { speakerTypeFilter, onChangeSpeakerType, willingFilter, onChangeWilling } = props;
  return (
    <div className="speaker-tracker-filters">
      <div className="speaker-tracker-filter-group">
        <div className="filter-label">Speaker Type</div>
        <ToggleButtonGroup
          value={speakerTypeFilter}
          exclusive
          onChange={onChangeSpeakerType}
          aria-label="speaker type"
        >
          <ToggleButton value="all" aria-label="all">
            All
          </ToggleButton>
          <ToggleButton value="adult" aria-label="adult">
            Adult
          </ToggleButton>
          <ToggleButton value="youth" aria-label="youth">
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
        >
          <ToggleButton value="all" aria-label="all">
            All
          </ToggleButton>
          <ToggleButton value="yes" aria-label="yes">
            Yes
          </ToggleButton>
          <ToggleButton value="no" aria-label="no">
            No
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export default SpeakerTrackerFilter;

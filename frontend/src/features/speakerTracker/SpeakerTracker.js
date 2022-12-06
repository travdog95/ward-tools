import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./speakerTracker.css";

const SpeakerTracker = () => {
  const [speakerTypeFilter, setSpeakerTypeFilter] = useState("all");
  const [willingFilter, setWillingFilter] = useState("all");
  const handleSpeakerType = (e, newSpeakerTypeFilter) => {
    setSpeakerTypeFilter(newSpeakerTypeFilter);
  };

  const handleWillingFilter = (e, newWillingFilter) => {
    setWillingFilter(newWillingFilter);
  };

  return (
    <>
      <h1>Speaker Tracker</h1>
      <div className="speaker-tracker-filters">
        <div className="speaker-tracker-filter-group">
          <div className="filter-label">Speaker Type</div>
          <ToggleButtonGroup
            value={speakerTypeFilter}
            exclusive
            onChange={handleSpeakerType}
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
            onChange={handleWillingFilter}
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
    </>
  );
};

export default SpeakerTracker;

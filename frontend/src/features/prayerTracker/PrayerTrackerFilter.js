import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const PrayerTrackerFilter = (props) => {
  const { willingFilter, onChangeWilling } = props;
  const toggleStyle = {
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: "1rem",
  };
  return (
    <div className="speaker-tracker-filters">
      <div className="speaker-tracker-filter-group">
        <div className="filter-label">Willing to Pray</div>
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

export default PrayerTrackerFilter;

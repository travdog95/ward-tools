import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getYear, parseISO } from "date-fns";

import SpeakerTrackerFilter from "./SpeakerTrackerFilter";
import SpeakerTrackerTable from "./SpeakerTrackerTable";
import { calculateAge } from "../../utils/helpers";
import "./speakerTracker.css";

const SpeakerTracker = () => {
  const { members } = useSelector((state) => state.members);

  const filterMembers = (speakerType, willing) => {
    let matchWilling = false;
    let matchSpeakerType = false;
    let willingFilterBool = false;
    let isOldEnough = false;

    return members.filter((member) => {
      const age = calculateAge(member.birthDate);
      isOldEnough = getYear(new Date()) - getYear(parseISO(member.birthDate)) >= 12;

      //Reset match variables
      matchWilling = false;
      matchSpeakerType = false;
      willingFilterBool = false;

      //Determine willing match
      if (willing === "all") {
        matchWilling = true;
      } else {
        willingFilterBool = willing === "no" ? false : true;
        matchWilling = member.isWillingToSpeak === willingFilterBool;
      }

      //Determine speaker type match
      if (speakerType === "all") {
        matchSpeakerType = true;
      } else {
        const memberType = age > 18 ? "adult" : "youth";

        matchSpeakerType = memberType === speakerType;
      }
      return matchSpeakerType && matchWilling && isOldEnough;
    });
  };

  const [speakerTypeFilter, setSpeakerTypeFilter] = useState("all");
  const [willingFilter, setWillingFilter] = useState("all");
  const [filteredMembers, setFilteredMembers] = useState(() => {
    return filterMembers(speakerTypeFilter, willingFilter);
  });

  const handleSpeakerType = (e, newSpeakerTypeFilter) => {
    setSpeakerTypeFilter(newSpeakerTypeFilter);
    setFilteredMembers(filterMembers(newSpeakerTypeFilter, willingFilter));
  };

  const handleWillingFilter = (e, newWillingFilter) => {
    setWillingFilter(newWillingFilter);
    setFilteredMembers(filterMembers(speakerTypeFilter, newWillingFilter));
  };

  return (
    <>
      <h1>Speaker Tracker</h1>
      <SpeakerTrackerFilter
        onChangeSpeakerType={handleSpeakerType}
        speakerTypeFilter={speakerTypeFilter}
        willingFilter={willingFilter}
        onChangeWilling={handleWillingFilter}
      />
      <SpeakerTrackerTable speakers={filteredMembers} />
    </>
  );
};

export default SpeakerTracker;

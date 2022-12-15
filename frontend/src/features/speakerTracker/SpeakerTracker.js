import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getYear, parseISO } from "date-fns";

import SpeakerTrackerFilter from "./SpeakerTrackerFilter";
import SpeakerTrackerTable from "./SpeakerTrackerTable";
import { setSpeakerFilters } from "../members/membersSlice";
import { calculateAge } from "../../utils/helpers";
import "./speakerTracker.css";

const SpeakerTracker = () => {
  const dispatch = useDispatch();
  const { allIds, byId, speakerFilters } = useSelector((state) => state.members);
  const memberIds = allIds;
  const membersById = byId;

  const filterMembers = (speakerType, willing) => {
    let matchWilling = false;
    let matchSpeakerType = false;
    let willingFilterBool = false;
    let isOldEnough = false;

    const filteredIds = memberIds.filter((memberId) => {
      const member = membersById[memberId];
      const age = calculateAge(member.birthDate);
      isOldEnough = getYear(new Date()) - getYear(parseISO(member.birthDate)) >= 12;
      const notServingMission = member.isServingMission ? !member.isServingMission : true;

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
      return matchSpeakerType && matchWilling && isOldEnough && notServingMission;
    });

    return filteredIds.map((id) => membersById[id]);
  };

  const [filteredMembers, setFilteredMembers] = useState(() => {
    return filterMembers(speakerFilters.speakerType, speakerFilters.willing);
  });

  const handleSpeakerType = (e, newSpeakerTypeFilter) => {
    dispatch(
      setSpeakerFilters({ speakerType: newSpeakerTypeFilter, willing: speakerFilters.willing })
    );
    setFilteredMembers(filterMembers(newSpeakerTypeFilter, speakerFilters.willing));
  };

  const handleWillingFilter = (e, newWillingFilter) => {
    dispatch(
      setSpeakerFilters({ speakerType: speakerFilters.speakerType, willing: newWillingFilter })
    );

    setFilteredMembers(filterMembers(speakerFilters.speakerType, newWillingFilter));
  };

  return (
    <>
      <h1>Speaker Tracker</h1>
      <SpeakerTrackerFilter
        onChangeSpeakerType={handleSpeakerType}
        speakerTypeFilter={speakerFilters.speakerType}
        willingFilter={speakerFilters.willing}
        onChangeWilling={handleWillingFilter}
      />
      <SpeakerTrackerTable speakers={filteredMembers} />
    </>
  );
};

export default SpeakerTracker;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getYear, parseISO } from "date-fns";

import PrayerTrackerFilter from "../features/prayerTracker/PrayerTrackerFilter";
import PrayerTrackerTable from "../features/prayerTracker/PrayerTrackerTable";
import { setPrayerFilters } from "../features/members/membersSlice";
// import { calculateAge } from "../utils/helpers";

const PrayerTracker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { allIds, byId, prayerFilters } = useSelector((state) => state.members);

  const memberIds = allIds;
  const membersById = byId;

  const filterMembers = (willing) => {
    let matchWilling = false;
    let willingFilterBool = false;
    let isOldEnough = false;

    const filteredIds = memberIds.filter((memberId) => {
      const member = membersById[memberId];
      // const age = calculateAge(member.birthDate);
      isOldEnough = getYear(new Date()) - getYear(parseISO(member.birthDate)) > 18;
      const notServingMission = member.isServingMission ? !member.isServingMission : true;

      //Reset match variables
      matchWilling = false;
      willingFilterBool = false;

      //Determine willing match
      if (willing === "all") {
        matchWilling = true;
      } else {
        willingFilterBool = willing === "no" ? false : true;
        matchWilling = member.isWillingToPray === willingFilterBool;
      }

      return matchWilling && isOldEnough && notServingMission;
    });

    return filteredIds.map((id) => membersById[id]);
  };

  const [filteredMembers, setFilteredMembers] = useState(() => {
    return filterMembers(prayerFilters.willing);
  });

  const handleWillingFilter = (e, newWillingFilter) => {
    dispatch(setPrayerFilters({ willing: newWillingFilter }));

    setFilteredMembers(filterMembers(newWillingFilter));
  };
  return (
    <>
      <h1>Prayer Tracker</h1>
      <PrayerTrackerFilter
        willingFilter={prayerFilters.willing}
        onChangeWilling={handleWillingFilter}
      />
      <PrayerTrackerTable members={filteredMembers} />
    </>
  );
};

export default PrayerTracker;

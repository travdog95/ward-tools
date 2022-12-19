import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { formatDate } from "../../utils/helpers";
import { getPrayersByMember } from "./prayersSlice";

const MemberProfilePrayer = ({ member }) => {
  const dispatch = useDispatch();

  const [viewPrayers, setViewPrayers] = useState(false);

  const { prayers, isLoading, message, isError } = useSelector((state) => state.prayers);

  const handlePrayerClick = (currentViewPray) => {
    if (!currentViewPray) {
      dispatch(getPrayersByMember(member._id));
    }
    setViewPrayers(!viewPrayers);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error(message);
    return <div>Error loading prayers!</div>;
  }

  const numPrayers = member.prayerCount;

  return (
    <>
      {numPrayers === 0 && <div>None!</div>}

      {viewPrayers && numPrayers > 0 && (
        <div onClick={() => handlePrayerClick(viewPrayers)} className="member-profile-prayers">
          {prayers.map((prayer, index) => {
            return (
              <div key={index} className="member-profile-prayer">
                {formatDate(prayer.date, "d-MMM-yyyy")}
              </div>
            );
          })}
        </div>
      )}

      {!viewPrayers && numPrayers > 0 && (
        <div onClick={() => handlePrayerClick(viewPrayers)}>
          ({numPrayers}) {formatDate(member.lastPrayerDate, "d-MMM-yyyy")}
        </div>
      )}
    </>
  );
};

export default MemberProfilePrayer;

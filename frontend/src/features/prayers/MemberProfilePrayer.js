import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { formatDate } from "../../utils/helpers";
import { getPrayersByMember } from "./prayersSlice";

const MemberProfilePrayer = ({ memberId }) => {
  const dispatch = useDispatch();

  const [viewPrayers, setViewPrayers] = useState(false);

  const { prayers, isLoading, message, isError } = useSelector((state) => state.prayers);

  useEffect(() => {
    dispatch(getPrayersByMember(memberId));
  }, [dispatch, memberId]);

  const handlePrayerClick = () => {
    setViewPrayers(!viewPrayers);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error(message);
    return <div>Error loading prayers!</div>;
  }

  const numPrayers = prayers.length;
  let lastPrayer = null;
  if (numPrayers > 0) {
    lastPrayer = prayers[numPrayers - 1];
  }

  return (
    <>
      {numPrayers === 0 && <div>None!</div>}

      {viewPrayers && numPrayers > 0 && (
        <div onClick={handlePrayerClick} className="member-profile-prayers">
          {prayers.map((prayer) => {
            return (
              <div key={prayer._id} className="member-profile-prayer">
                {formatDate(prayer.sacramentMeeting.date, "d-MMM-yyyy")}
              </div>
            );
          })}
        </div>
      )}

      {!viewPrayers && numPrayers > 0 && (
        <div onClick={handlePrayerClick}>
          ({numPrayers}) {formatDate(lastPrayer.sacramentMeeting.date, "d-MMM-yyyy")}
        </div>
      )}
    </>
  );
};

export default MemberProfilePrayer;

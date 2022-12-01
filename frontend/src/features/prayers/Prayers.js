import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { formatDate } from "../../utils/helpers";
import { getPrayersByMember } from "./prayersSlice";

const Prayers = ({ memberId }) => {
  const dispatch = useDispatch();

  const { prayers, isLoading, message, isError } = useSelector((state) => state.prayers);

  useEffect(() => {
    dispatch(getPrayersByMember(memberId));
  }, [dispatch, memberId]);

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
      {numPrayers > 0 ? (
        <div>
          ({numPrayers}) {formatDate(lastPrayer.sacramentMeeting.date, "d-MMM-yyyy")}
        </div>
      ) : (
        <div>None!</div>
      )}
    </>
  );
};

export default Prayers;

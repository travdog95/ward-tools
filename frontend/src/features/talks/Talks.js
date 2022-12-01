import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { formatDate } from "../../utils/helpers";
import { getTalksByMember } from "./talksSlice";

const Talks = ({ memberId }) => {
  const dispatch = useDispatch();

  const { talks, isLoading, message, isError } = useSelector((state) => state.talks);

  useEffect(() => {
    dispatch(getTalksByMember(memberId));
  }, [dispatch, memberId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error(message);
    return <div>Error loading talks!</div>;
  }

  const numTalks = talks.length;
  let lastTalk = null;
  let lastTalkTopic = "";
  if (numTalks > 0) {
    lastTalk = talks[numTalks - 1];
    lastTalkTopic = lastTalk.topic === "" ? "no topic" : lastTalk.topic;
  }

  return (
    <>
      {numTalks > 0 ? (
        <div>
          ({numTalks}) {lastTalkTopic}- {formatDate(lastTalk.sacramentMeeting.date, "d-MMM-yyyy")}
        </div>
      ) : (
        <div>Never!</div>
      )}
    </>
  );
};

export default Talks;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { formatDate } from "../../../utils/helpers";
import { getTalksByMember } from "../../talks/talksSlice";

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

  return (
    <div>
      {talks.map((talk, index) => {
        const topicText = talk.topic === "" ? "no topic" : talk.topic;
        return (
          <div key={index}>
            {formatDate(talk.sacramentMeeting.date, "d-MMM-yyyy")} - {topicText}
          </div>
        );
      })}
    </div>
  );
};

export default Talks;

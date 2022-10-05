import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getTalksByMember } from "../../talks/talksSlice";

const Talks = ({ memberId }) => {
  const dispatch = useDispatch();

  const { talks, isError, message, isLoading } = useSelector((state) => state.talks);

  useEffect(() => {
    dispatch(getTalksByMember(memberId));
  }, [dispatch, memberId]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }

  return (
    <div>
      {talks.map((talk, index) => {
        return <div key={index}>{talk.talkType}</div>;
      })}
    </div>
  );
};

export default Talks;

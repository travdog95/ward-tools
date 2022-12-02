import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { formatDate } from "../../utils/helpers";
import { getTalksByMember } from "./talksSlice";

const MemberProfileTalk = ({ memberId }) => {
  const dispatch = useDispatch();

  const [viewTalks, setViewTalks] = useState(false);

  const { talks, isLoading, message, isError } = useSelector((state) => state.talks);

  useEffect(() => {
    dispatch(getTalksByMember(memberId));
  }, [dispatch, memberId]);

  const handleTalkClick = () => {
    setViewTalks(!viewTalks);
  };

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
      {numTalks === 0 && <div>None!</div>}

      {viewTalks && numTalks > 0 && (
        <div onClick={handleTalkClick} className="member-profile-talks">
          {talks.map((talk) => {
            const talkTopic = talk.topic === "" ? "no topic" : talk.topic;
            return (
              <div key={talk._id} className="member-profile-talk">
                {formatDate(talk.sacramentMeeting.date, "d-MMM-yyyy")} - {talkTopic}
              </div>
            );
          })}
        </div>
      )}

      {!viewTalks && numTalks > 0 && (
        <div onClick={handleTalkClick}>
          ({numTalks}) {formatDate(lastTalk.sacramentMeeting.date, "d-MMM-yyyy")} - {lastTalkTopic}
        </div>
      )}
    </>
  );
};

export default MemberProfileTalk;

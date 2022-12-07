import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";

import { deleteTalk, updateTalk } from "../meetingsSlice";
import AutoUpdateTextField from "../../../components/AutoUpdateTextField";
import "./talkRow.css";

const TalkRow = ({ talk, member }) => {
  const dispatch = useDispatch();

  const [topic, setTopic] = useState(talk.topic);
  const [oldTopic, setOldTopic] = useState(talk.topic);

  const { deletingTalk, currentTalkId, updatingTalk, isError } = useSelector(
    (state) => state.meetings
  );

  const handleOnTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleOnTopicBlur = (e) => {
    const newTopic = e.target.value;
    if (oldTopic !== newTopic) {
      setOldTopic(newTopic);
      dispatch(updateTalk({ id: talk._id, topic: newTopic }));
    }
  };

  const handleDeleteTalk = (talk) => {
    dispatch(deleteTalk(talk));
  };

  const loading = deletingTalk && currentTalkId === talk._id && !isError;

  return (
    <div className="sacrament-meeting-talk-row">
      <div className="sacrament-meeting-speaker">
        {member.firstName} {member.lastName}
      </div>

      <AutoUpdateTextField
        textFieldId="topic"
        variant="standard"
        value={topic}
        placeholder="Topic"
        onChange={handleOnTopicChange}
        onBlur={handleOnTopicBlur}
        updating={updatingTalk}
        idBeingUpdated={currentTalkId}
        id={talk._id}
        textFieldClassName="sacrament-meeting-speaker-topic"
      />
      <LoadingButton
        loading={loading}
        loadingPosition="center"
        onClick={() => handleDeleteTalk(talk)}
        variant="text"
      >
        <DeleteIcon size="small" />
      </LoadingButton>
    </div>
  );
};

export default TalkRow;

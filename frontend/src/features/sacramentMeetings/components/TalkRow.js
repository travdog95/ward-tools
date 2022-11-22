import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";

import { deleteTalk } from "../../meetings/meetingsSlice";
import "./talkRow.css";

const TalkRow = ({ talk, member }) => {
  const dispatch = useDispatch();

  const { deletingTalk, currentTalkId } = useSelector((state) => state.meetings);

  const handleDeleteTalk = (talk) => {
    dispatch(deleteTalk(talk));
  };

  const loading = deletingTalk && currentTalkId === talk._id;
  return (
    <div className="sacrament-meeting-talk-row">
      <div className="sacrament-meeting-talk">
        {talk.talkType} - {member.firstName} {member.lastName} -
        {talk.topic ? talk.topic : "no topic"}
      </div>
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

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { addTalk } from "../meetingsSlice";
import MemberAutoComplete from "../../../components/MemberAutoComplete";
import "./addTalk.css";

const AddTalk = ({ meeting }) => {
  const dispatch = useDispatch();

  const [topic, setTopic] = useState("");
  const [member, setMember] = useState(null);

  const { addingTalk, currentMeetingId, isError, message } = useSelector((state) => state.meetings);
  const { allIds, byId } = useSelector((state) => state.members);
  const members = allIds.map((memberId) => {
    return byId[memberId];
  });

  const handleAddTalk = () => {
    if (member) {
      //TODO: determine talk type
      const talk = {
        topic,
        talkType: "Adult",
        member: member._id,
        sacramentMeeting: meeting._id,
        date: meeting.date,
      };
      dispatch(addTalk(talk));
      setTopic("");
      setMember(null);
    }
  };

  const handleOnTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSearch = (searchValue) => {
    setMember(searchValue);
  };

  if (isError) {
    console.error("Error adding talk.", message);
    return "Error";
  }

  const loading = addingTalk && currentMeetingId === meeting._id && !isError;
  return (
    <>
      <div className="add-talk-container">
        <MemberAutoComplete
          member={member}
          members={members}
          onChange={handleSearch}
          label="Speaker"
          className="talk-member"
        />
        <TextField
          id="topic"
          variant="standard"
          value={topic}
          placeholder="Topic"
          onChange={handleOnTopicChange}
          className="talk-topic"
        />
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          onClick={handleAddTalk}
          variant="outlined"
          startIcon={<AddCircleIcon />}
          sx={{ paddingLeft: 3, paddingRight: 3 }}
        >
          Add
        </LoadingButton>
      </div>
    </>
  );
};

export default AddTalk;

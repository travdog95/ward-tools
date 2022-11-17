import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AutoComplete from "@mui/material/AutoComplete";

import { addTalk } from "../../sacramentMeetings/components/sacramentMeetingSlice";
import "./addTalk.css";

const AddTalk = ({ meeting }) => {
  const dispatch = useDispatch();

  const [topic, setTopic] = useState("");
  const [member, setMember] = useState(null);

  const { isLoading, isError, message } = useSelector((state) => state.talks);
  const { members } = useSelector((state) => state.members);

  const handleAddTalk = () => {
    const talk = { topic, talkType: "Adult", member: member._id, sacramentMeeting: meeting._id };
    dispatch(addTalk(talk));
  };

  const handleOnTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSearch = (searchValue) => {
    setMember(searchValue);
  };

  return (
    <>
      <div className="add-talk-container">
        <AutoComplete
          options={members}
          size="small"
          getOptionLabel={(option) => option.preferredName}
          renderInput={(params) => <TextField {...params} label="Member" />}
          onChange={(event, newValue) => handleSearch(newValue)}
          value={member}
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
        <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={handleAddTalk}>
          Add
        </Button>
        <div className="adding-talk-indicator">
          {isLoading ? <CircularProgress size={20} /> : null}
        </div>
      </div>
    </>
  );
};

export default AddTalk;

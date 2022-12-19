import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { addPrayer } from "../meetingsSlice";
import MemberAutoComplete from "../../../components/MemberAutoComplete";
import "./addTalk.css";

const AddPrayer = ({ meeting, type }) => {
  const dispatch = useDispatch();

  const [member, setMember] = useState(null);

  const { addingPrayer, currentMeetingId, isError, message } = useSelector(
    (state) => state.meetings
  );
  const { allIds, byId } = useSelector((state) => state.members);
  const members = allIds.map((memberId) => {
    return byId[memberId];
  });

  const handleAddPrayer = () => {
    if (member) {
      const newPrayer = {
        prayerType: type,
        member: member._id,
        sacramentMeeting: meeting._id,
        date: meeting.date,
      };
      dispatch(addPrayer(newPrayer));
      setMember(null);
    }
  };

  const handleSearch = (searchValue) => {
    setMember(searchValue);
  };

  if (isError) {
    console.error("Error adding talk.", message);
    return "Error";
  }

  const loading = addingPrayer && currentMeetingId === meeting._id && !isError;
  return (
    <>
      <div className="add-talk-container">
        <MemberAutoComplete
          member={member}
          members={members}
          onChange={handleSearch}
          label={type}
          className="talk-member"
        />
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          onClick={handleAddPrayer}
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

export default AddPrayer;

import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";

import { deletePrayer } from "../meetingsSlice";
import "./talkRow.css";

const PrayerRow = ({ prayer, member }) => {
  const dispatch = useDispatch();

  const { deletingPrayer, currentPrayerId, isError } = useSelector((state) => state.meetings);

  const handleDeletePrayer = (prayer) => {
    dispatch(deletePrayer(prayer));
  };

  const loading = deletingPrayer && currentPrayerId === prayer._id && !isError;

  return (
    <div className="sacrament-meeting-talk-row">
      <div className="sacrament-meeting-speaker">
        {member.firstName} {member.lastName}
      </div>

      <LoadingButton
        loading={loading}
        loadingPosition="center"
        onClick={() => handleDeletePrayer(prayer)}
        variant="text"
      >
        <DeleteIcon size="small" />
      </LoadingButton>
    </div>
  );
};

export default PrayerRow;

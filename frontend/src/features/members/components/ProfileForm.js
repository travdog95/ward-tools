import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ToggleButtons from "../../../components/ToggleButtons";
import { updateMember } from "../membersSlice";
import { calculateAge, formatDate, formatPhone } from "../../../utils/helpers";

const ProfileForm = (props) => {
  const dispatch = useDispatch();

  const { isUpdating } = useSelector((state) => state.members);

  const { member } = props;

  const age = calculateAge(member.birthDate);
  const birthday = formatDate(member.birthDate, "LLL d");

  const [memberWillingToPray, setMemberWillingToPray] = useState(member.isWillingToPray);
  const [memberWillingToSpeak, setMemberWillingToSpeak] = useState(member.isWillingToSpeak);
  const [memberContactForTithing, setMemberContactForTithing] = useState(member.contactForTithing);
  const [servingMission, setServingMission] = useState(
    member.isServingMission ? member.isServingMission : false
  );
  const [idBeingUpdated, setIdBeingUpdated] = useState("");

  const handleWillingToPrayChange = (event, newValue) => {
    if (newValue !== null) {
      setMemberWillingToPray(newValue);
      setIdBeingUpdated("pray");
      dispatch(updateMember({ id: member._id, isWillingToPray: newValue }));
    }
  };

  const handleWillingToSpeakChange = (event, newValue) => {
    if (newValue !== null) {
      setMemberWillingToSpeak(newValue);
      setIdBeingUpdated("speak");
      dispatch(updateMember({ id: member._id, isWillingToSpeak: newValue }));
    }
  };

  const handleContactForTithingChange = (event, newValue) => {
    if (newValue !== null) {
      setMemberContactForTithing(newValue);
      setIdBeingUpdated("tithing");
      dispatch(updateMember({ id: member._id, contactForTithing: newValue }));
    }
  };

  const handleServingMissionChange = (event, newValue) => {
    if (newValue !== null) {
      setServingMission(newValue);
      setIdBeingUpdated("mission");
      dispatch(updateMember({ id: member._id, isServingMission: newValue }));
    }
  };

  return (
    <div className="profile-form">
      <div className="form-row">
        <div className="label">Record Number</div>
        <div className="value">{member.memberId}</div>
      </div>
      <div className="form-row">
        <div className="label">Phone</div>
        <div className="value">{formatPhone(member.phone)}</div>
      </div>
      <div className="form-row">
        <div className="label">E-mail</div>
        <div className="value">{member.email}</div>
      </div>
      <div className="form-row">
        <div className="label">Birthday (Age)</div>
        <div className="value">
          {birthday} ({age})
        </div>
      </div>
      <div className="form-row">
        <div className="label">Address</div>
        <div className="value">{member.address1}</div>
      </div>
      <div className="form-row">
        <div className="label">Gender</div>
        <div className="value">{member.gender}</div>
      </div>

      <div className="form-row">
        <div className="label">Willing to Pray?</div>
        <div className="value">
          <ToggleButtons
            value={memberWillingToPray}
            onChange={handleWillingToPrayChange}
            label="Willing to Pray"
            updating={isUpdating}
            id="pray"
            idBeingUpdated={idBeingUpdated}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="label">Willing to Speak?</div>
        <div className="value">
          <ToggleButtons
            value={memberWillingToSpeak}
            onChange={handleWillingToSpeakChange}
            label="Willing to Speak"
            updating={isUpdating}
            id="speak"
            idBeingUpdated={idBeingUpdated}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="label">Contact for Tithing?</div>
        <div className="value">
          <ToggleButtons
            value={memberContactForTithing}
            onChange={handleContactForTithingChange}
            label="Contact for Tithing to Speak"
            updating={isUpdating}
            id="tithing"
            idBeingUpdated={idBeingUpdated}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="label">Serving Mission?</div>
        <div className="value">
          <ToggleButtons
            value={servingMission}
            onChange={handleServingMissionChange}
            label="Serving Mission"
            updating={isUpdating}
            id="mission"
            idBeingUpdated={idBeingUpdated}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;

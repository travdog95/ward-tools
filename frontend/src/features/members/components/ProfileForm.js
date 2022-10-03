import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

import { updateMember } from "../memberSlice";
import { calculateAge, formatDate, formatPhone } from "../../../utils/helpers";

const ProfileForm = (props) => {
  const dispatch = useDispatch();
  const { member } = props;
  const age = calculateAge(member.birthDate);
  const birthday = formatDate(member.birthDate, "LLL d");

  const [memberWillingToPray, setMemberWillingToPray] = useState(member.isWillingToPray);
  const [memberWillingToSpeak, setMemberWillingToSpeak] = useState(member.isWillingToSpeak);
  const [memberContactForTithing, setMemberContactForTithing] = useState(member.contactForTithing);

  const handleWillingToPrayChange = (event, newValue) => {
    if (newValue !== null) {
      setMemberWillingToPray(newValue);
      dispatch(updateMember({ id: member._id, isWillingToPray: newValue }));
    }
  };

  const handleWillingToSpeakChange = (event, newValue) => {
    if (newValue !== null) {
      setMemberWillingToSpeak(newValue);
      dispatch(updateMember({ id: member._id, isWillingToSpeak: newValue }));
    }
  };

  const handleContactForTithingChange = (event, newValue) => {
    if (newValue !== null) {
      setMemberContactForTithing(newValue);
      dispatch(updateMember({ id: member._id, contactForTithing: newValue }));
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
        <div className="label">Birthday</div>
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
          <ToggleButtonGroup
            size="small"
            value={memberWillingToPray}
            exclusive
            onChange={handleWillingToPrayChange}
            aria-label="Willing to Pray"
          >
            <ToggleButton value={true}>Yes</ToggleButton>
            <ToggleButton value={false}>No</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="form-row">
        <div className="label">Willing to Speak?</div>
        <div className="value">
          <ToggleButtonGroup
            size="small"
            value={memberWillingToSpeak}
            exclusive
            onChange={handleWillingToSpeakChange}
            aria-label="Willing to Speak"
          >
            <ToggleButton value={true}>Yes</ToggleButton>
            <ToggleButton value={false}>No</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="form-row">
        <div className="label">Contact for Tithing?</div>
        <div className="value">
          <ToggleButtonGroup
            size="small"
            value={memberContactForTithing}
            exclusive
            onChange={handleContactForTithingChange}
            aria-label="Contact for Tithing"
          >
            <ToggleButton value={true}>Yes</ToggleButton>
            <ToggleButton value={false}>No</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;

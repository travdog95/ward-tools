import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

import Spinner from "../components/Spinner";
import { getMember } from "../features/members/memberSlice";
import { calculateAge, formatDate, formatPhone } from "../utils/helpers";

const Member = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { member, isLoading, isError, message, isSuccess } = useSelector((state) => state.member);

  const [memberWillingToPray, setMemberWillingToPray] = useState(member.isWillingToPray);
  const handleWillingToPrayChange = (event, newValue) => {
    if (newValue !== null) {
      setMemberWillingToPray(newValue);
    }
  };

  const [memberWillingToSpeak, setMemberWillingToSpeak] = useState(member.isWillingToSpeak);
  const handleWillingToSpeakChange = (event, newValue) => {
    if (newValue !== null) {
      setMemberWillingToSpeak(newValue);
    }
  };

  const { id } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && message) {
      toast.success(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getMember(id));

    // return () => {
    //   dispatch(reset())
    // }
  }, [user, navigate, message, isError, dispatch, isSuccess, id]);

  useEffect(() => {
    setMemberWillingToPray(member.isWillingToPray);
    setMemberWillingToSpeak(member.isWillingToSpeak);
  }, [member]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Member Profile</h1>
      <section className="profile-container">
        <div className="profile-header">
          <a href={`${member.prefferedNameURL}`} target="_blank" rel="noreferrer">
            {member.firstName} {member.lastName}
          </a>
        </div>
        <div className="form-row">
          <div className="label">Record Number</div>
          <div className="info">{member.memberId}</div>
        </div>

        <div className="form-row">
          <div className="label">Phone</div>
          <div className="info">{formatPhone(member.phone)}</div>
        </div>
        <div className="form-row">
          <div className="label">E-mail</div>
          <div className="info">{member.email}</div>
        </div>
        <div className="form-row">
          <div className="label">Birthday</div>
          <div className="info">
            {formatDate(member.birthDate, "LLL d")} ({calculateAge(member.birthDate)})
          </div>
        </div>
        <div className="form-row">
          <div className="label">Address</div>
          <div className="info">{member.address1}</div>
        </div>
        <div className="form-row">
          <div className="label">Willing to Pray?</div>
          <div className="info">
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
          <div className="info">
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
            {member.isWillingToSpeak}
          </div>
        </div>
      </section>
    </>
  );
};

export default Member;

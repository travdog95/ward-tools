import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import ProfileForm from "../features/member/components/ProfileForm";
import ProfileDetail from "../features/member/components/ProfileDetail";
import MemberAutoComplete from "../components/MemberAutoComplete";
import Spinner from "../components/Spinner";
import { getMember } from "../features/member/memberSlice";

import "../features/member/components/member.css";

const Member = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { member, isLoading, isError, message } = useSelector((state) => state.member);
  const { members } = useSelector((state) => state.members);

  const [searchValue, setSearchValue] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (id) {
      dispatch(getMember(id));
    }
  }, [user, navigate, message, isError, dispatch, id]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleSearch = (newSearchValue) => {
    setSearchValue(newSearchValue);
    navigate("/member/" + newSearchValue._id);
  };

  return (
    <>
      <h1>Member Profile</h1>
      <MemberAutoComplete
        members={members}
        label="Search"
        onChange={handleSearch}
        member={searchValue}
        className=""
      />
      {id ? (
        <section className="profile-container">
          <div className="profile-header">
            <a href={`${member.prefferedNameURL}`} target="_blank" rel="noreferrer">
              {member.firstName} {member.lastName}
            </a>
          </div>
          <div className="profile-inner-container">
            <ProfileForm member={member} />
            <ProfileDetail memberId={id} />
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Member;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getMember } from "../features/members/membersSlice";
import ProfileForm from "../features/members/components/ProfileForm";
import ProfileDetail from "../features/members/components/ProfileDetail";
import MemberAutoComplete from "../components/MemberAutoComplete";
import Spinner from "../components/Spinner";
import "../features/members/components/member.css";

const Member = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { byId, allIds, isError, message, member, isLoadingMember } = useSelector(
    (state) => state.members
  );

  const { id } = useParams();

  const members = allIds.map((memberId) => {
    return byId[memberId];
  });

  const [searchValue, setSearchValue] = useState(null);

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
  }, [user, navigate, isError, message, dispatch, id]);

  if (isLoadingMember) {
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
      {id && member ? (
        <section className="profile-container">
          <div className="profile-header">
            <a href={`${member.prefferedNameURL}`} target="_blank" rel="noreferrer">
              {member.firstName} {member.lastName}
            </a>
          </div>
          <div className="profile-inner-container">
            <ProfileForm member={member} />
            <ProfileDetail memberId={id} member={member} />
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Member;

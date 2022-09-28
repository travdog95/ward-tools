import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import Spinner from "../components/Spinner";
import { getMember } from "../features/members/memberSlice";

const Member = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { member, isLoading, isError, message, isSuccess } = useSelector((state) => state.member);

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div>Member Profile</div>
      <div className="profile-container">
        <div className="row">
          <span className="label">Preferred Name</span>
          <span>{member.preferredName}</span>
        </div>
      </div>
    </>
  );
};

export default Member;

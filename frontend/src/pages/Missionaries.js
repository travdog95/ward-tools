import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import MissionariesTable from "../features/missionaries/MissionariesTable";

const Missionaries = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { allIds, byId } = useSelector((state) => state.members);

  const members = allIds.map((memberId) => {
    return byId[memberId];
  });
  const missionaries = members.filter((member) => member.isServingMission === true);

  return (
    <>
      <h1>Missionaries</h1>
      <MissionariesTable missionaries={missionaries} />
    </>
  );
};

export default Missionaries;

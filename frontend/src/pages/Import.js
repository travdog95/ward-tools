import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ImportSpeakerData from "../features/importData/components/ImportSpeakerData";

const Import = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Import Data</h1>
      <ImportSpeakerData />
    </div>
  );
};

export default Import;

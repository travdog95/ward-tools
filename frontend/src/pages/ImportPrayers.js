import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ImportPrayerData from "../features/importData/components/ImportPrayerData";

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
      <h1>Import Prayer Data</h1>
      <ImportPrayerData />
    </div>
  );
};

export default Import;

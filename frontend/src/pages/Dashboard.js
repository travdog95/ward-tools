import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SpeakerTracker from "../features/speakerTracker/SpeakerTracker";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return <SpeakerTracker />;
};

export default Dashboard;

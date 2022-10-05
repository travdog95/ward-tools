import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DataFiles from "./pages/DataFiles";
import WardList from "./pages/WardList";
import Member from "./pages/Member";
import SacramentMeetings from "./pages/SacramentMeetings";
import { getMembers } from "./features/members/membersSlice";
import Spinner from "./components/Spinner";

const App = () => {
  const dispatch = useDispatch();

  const { isError, isLoading, message } = useSelector((state) => state.members);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (user) {
      dispatch(getMembers());
    }
  }, [message, isError, user, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dataFiles" element={<DataFiles />} />
            <Route path="/wardlist" element={<WardList />} />
            <Route path="/member/:id" element={<Member />} />
            <Route path="/member" element={<Member />} />
            <Route path="/sacramentmeetings" element={<SacramentMeetings />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;

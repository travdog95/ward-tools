import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DataFiles from "./pages/DataFiles";
// import ConfirmationDialog from "./components/ConfirmationDialog";

const App = () => {
  const { confirmationDialog } = useSelector((state) => state.app);

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
          </Routes>
        </div>
      </Router>
      <ToastContainer />
      {/* {confirmationDialog.open ? <ConfirmationDialog /> : null} */}
    </>
  );
};

export default App;

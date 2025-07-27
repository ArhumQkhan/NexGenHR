import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Topbar.css";

function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <div className="topbar">
      <div className="logo">NexGenHR</div>
      <div className="topbar-links">
        <Link to="/admin-dashboard">Dashboard</Link>
        <Link to="/cv-screening">CV Screening</Link>
        <Link to="/employee">Job Posting</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Topbar;

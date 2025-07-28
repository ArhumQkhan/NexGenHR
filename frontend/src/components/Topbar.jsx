import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Topbar.css";

function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/admin-login", { replace: true });
  };

  return (
    <div className="topbar">
      <div className="logo">NexGenHR</div>
      <div className="topbar-links">
        <Link to="/Employee">Dashboard</Link>
        <a href="http://localhost:8501/" target="_blank" rel="noopener noreferrer">
          CV Screening
        </a>
        <Link to="/admin/create-job">Job Posting</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Topbar;

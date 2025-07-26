import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSidebar.css"; // Create this CSS file

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <div className="admin-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <h2>NexGenHR</h2>
      </div>

      {/* Navigation Links */}
      <div className="sidebar-links">
        <Link to="/employee"> Home</Link>
        <a
          href="http://localhost:8501"
          target="_blank"
          rel="noopener noreferrer"
        >
           CV Screening
        </a>
        <Link to="/admin/create-job"> Job Posting</Link>
      </div>

      {/* Logout */}
      <div className="sidebar-footer">
        <button onClick={handleLogout}> Logout</button>
      </div>
    </div>
  );
};

export default AdminSidebar;

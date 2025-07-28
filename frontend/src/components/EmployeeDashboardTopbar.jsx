import React from "react";
import "../../EmployeeDashboard.css";

export default function EmployeeDashboardTopbar({ onLogout }) {
  return (
    <div className="employee-dashboard-topbar">
      <div className="employee-dashboard-logo">NexGenHR</div>
      <button className="employee-dashboard-logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

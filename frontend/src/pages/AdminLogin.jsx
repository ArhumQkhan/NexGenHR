import React from "react";
import "./loginForm.css";

function AdminLogin() {
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-box">
          <h2>Admin Login</h2>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="image-section">
          <img src="/admin-login.jpg" alt="Background" />
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
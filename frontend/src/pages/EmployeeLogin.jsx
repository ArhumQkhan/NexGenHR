import React from "react";
import "./loginForm.css"; // Reuse the same CSS file

function EmployeeLogin() {
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-box">
          <h2>Employee Login</h2>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="image-section">
          <img src="/emp-login.jpg" alt="Background" />
        </div>
      </div>
    </div>
  );
}

export default EmployeeLogin;
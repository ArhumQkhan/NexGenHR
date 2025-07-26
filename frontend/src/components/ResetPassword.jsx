import React, { useState } from "react";
import "./resetPassword.css"; // Create this file for styles

function ResetPassword() {
  const [username, setUsername] = useState(localStorage.getItem("resetEmail") || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, otp, newPassword }),
    });

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      alert("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/"; // or navigate("/admin-login");
      }, 2000);
    }
  };

  return (
<div className="content">
    <div className="reset-container">
      <div className="reset-box">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleReset}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label>OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              placeholder="Enter OTP"
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
            />
          </div>
          <button type="submit" className="reset-button">Reset Password</button>
        </form>
        {message && <p className="reset-message">{message}</p>}
      </div>
    </div>
</div>
  );
}

export default ResetPassword;

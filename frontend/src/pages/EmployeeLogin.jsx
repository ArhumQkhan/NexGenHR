import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import employeeAnim from "../assets/lotties/employeeLogin.json";
import "./loginForm.css"; // Your existing CSS file

function EmployeeLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        role: "Employee",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      localStorage.setItem("authToken", data.token);
      navigate(data.userId ? `/employeedash/${data.userId}` : "/admindash");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-page-container">
      {/* Left Half - Form */}
      <div className="login-left">
        <h2>Welcome Back!</h2>
        <p>Login to your employee dashboard and manage your work efficiently.</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <a href="#" className="forgot-password">Forgot Password?</a>
        </form>
      </div>

      {/* Right Half - Animation */}
      <div className="login-right">
        <Lottie animationData={employeeAnim} loop={true} />
      </div>
    </div>
  );
}

export default EmployeeLogin;

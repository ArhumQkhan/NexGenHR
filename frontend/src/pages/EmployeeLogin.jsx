import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./loginForm.css"; // Reuse the same CSS file

function EmployeeLogin() {
  const navigate = useNavigate();

  // State for input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    // Send POST request to the backend
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
        role: 'Employee',  // HR role specified for this page
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);  // Handle successful login
      localStorage.setItem('authToken', data.token);  // Store the JWT token
      navigate('/dashboard');  // Redirect to dashboard (or any other page)
    } else {
      alert(data.message);  // Handle invalid login
    }
  };
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-box">
          <h2>Employee Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email"
            placeholder="Email" required 
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update id state
            />
            <input type="password"
            placeholder="Password" required 
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            
            />
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
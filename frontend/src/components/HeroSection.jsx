import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import Cards from "./Cards"; // Import the Cards component

function HeroSection() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="hero-container">
        {/* Left Side - Image */}
        <div className="hero-image">
          {/* Replace 'new_image.png' with the name of your image file in the public folder */}
          <img src="/right_bg.png" alt="New Adventure" />
        </div>

        {/* Right Side - Text Content */}
        <div className="hero-text">
          <h1>Simplify HR, Amplify Success</h1>
          <p>What are you waiting for?</p>
          <div className="hero-btns">
            <button
              className="btns btn--primary btn--large"
              onClick={() => navigate("/employee-login")}
            >
              Login as Employee
            </button>
            <button
              className="btns btn--primary btn--large"
              onClick={() => navigate("/admin-login")}
            >
              Login as Admin
            </button>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <Cards />
    </>
  );
}

export default HeroSection;
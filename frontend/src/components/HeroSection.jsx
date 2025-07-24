import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import Cards from "./Cards";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="hero-container">
        {/* Left Side - Image */}
        <div className="hero-image" data-aos="fade-right">
          <img src="/right_bg.png" alt="New Adventure" />
        </div>

        {/* Right Side - Text Content */}
        <div className="hero-text" data-aos="fade-left" data-aos-delay="200">
          <h1>Simplify HR, Amplify Success</h1>
          <p>What are you waiting for?</p>
          <div className="hero-btns" data-aos="fade-up" data-aos-delay="400">
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

      {/* Info Section */}
      <section className="info-section" data-aos="fade-up" data-aos-delay="200">
        <h2>Why Choose NexGenHR?</h2>
        <p>Streamline your HR processes with our smart, modern tools.</p>
      </section>

      {/* Cards Section */}
      <Cards />
    </>
  );
}

export default HeroSection;

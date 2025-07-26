import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./HeroSection.css";
import Cards from "./Cards";
import Lottie from "lottie-react";
import homePageAnim from "../assets/lotties/homePage.json";

function HeroSection() {
  const navigate = useNavigate();

  return (
   <>
    {/* Hero Section */}
    <div className="hero-container">
      {/* Left Side - Lottie Animation */}
      <motion.div
        className="hero-image"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Lottie
          animationData={homePageAnim}
          loop={true}
          style={{ width: "100%", maxWidth: "500px", height: "auto" }}
        />
      </motion.div>

      {/* Right Side - Text Content */}
      <motion.div
        className="hero-text"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1>Simplify HR, Amplify Success</h1>
        <p>What are you waiting for?</p>

        <motion.div
          className="hero-btns"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
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
        </motion.div>
      </motion.div>
    </div>
      {/* Info Section */}
      <motion.section
        className="info-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Why Choose NexGenHR?</h2>
        <p>Streamline your HR processes with our smart, modern tools.</p>
      </motion.section>

      {/* Cards Section */}
      <Cards />
    </>
  );
}

export default HeroSection;

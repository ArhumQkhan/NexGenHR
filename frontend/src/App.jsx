import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import JobPosting from "./pages/JobPosting";
import HeroSection from "./components/HeroSection";
import EmployeeLogin from "./pages/EmployeeLogin";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Layout>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/job-posting" element={<JobPosting />} />
            <Route path="/employee-login" element={<EmployeeLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;

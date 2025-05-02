import React, { useState } from "react";
import "./postCards.css";

const JobCard = ({ title, company, location, description }) => {
  const [cvFile, setCvFile] = useState(null);

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleApply = () => {
    if (!cvFile) {
      alert("Please select a CV file before applying.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", cvFile);
    formData.append("jobTitle", title); // Optional: send job title too

    fetch("http://localhost:3001/apply", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => alert(data.message || "Application submitted!"))
      .catch((err) => {
        console.error("Upload error:", err);
        alert("Failed to apply.");
      });
  };

  return (
    <div className="job-card">
      <h3 className="job-title">{title}</h3>
      <p className="job-company"><strong>Company:</strong> {company}</p>
      <p className="job-location"><strong>Location:</strong> {location}</p>
      <p className="job-description">{description}</p>
      
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      <button className="apply-button" onClick={handleApply}>Apply Now</button>
    </div>
  );
};

export default JobCard;

import React, { useState } from "react";
import "./postCards.css";

const colors = ['#f8f9fa', '#e3f2fd', '#e8f5e9', '#fff3e0', '#fce4ec'];

const JobCard = ({ title, company, location, description, index }) => {
  const [cvFile, setCvFile] = useState(null);
  const handleFileChange = (e) => setCvFile(e.target.files[0]);

  const handleApply = () => {
    if (!cvFile) return alert("Please select a CV file before applying.");

    const formData = new FormData();
    formData.append("cv", cvFile);
    formData.append("jobTitle", title);

    fetch("http://localhost:3001/apply", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => alert(data.message || "Application submitted!"))
      .catch(() => alert("Failed to apply."));
  };

  const bgColor = colors[index % colors.length];
  const aosAnimation = index % 2 === 0 ? 'fade-right' : 'fade-left';

  return (
    <div
      className="job-card"
      style={{ backgroundColor: bgColor }}
      data-aos={aosAnimation}
    >
      <h3 className="job-title">{title}</h3>
      <p className="job-company"><strong>Company:</strong> {company}</p>
      <p className="job-location"><strong>Location:</strong> {location}</p>
      <p className="job-description">{description}</p>

      <input type="file" id={`cv-upload-${index}`} accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      <label htmlFor={`cv-upload-${index}`} className="choose-file-button">Choose File</label>

      <button className="apply-button" onClick={handleApply}>Apply Now</button>
    </div>
  );
};

export default JobCard;

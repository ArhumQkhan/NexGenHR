import React from "react";
import "./postCards.css"; // We'll create this CSS file next

const JobCard = ({ title, company, location, description, onApply }) => {
  return (
    <div className="job-card">
      <h3 className="job-title">{title}</h3>
      <p className="job-company"><strong>Company:</strong> {company}</p>
      <p className="job-location"><strong>Location:</strong> {location}</p>
      <p className="job-description">{description}</p>
      <button className="apply-button" onClick={onApply}>Apply Now</button>
    </div>
  );
};

export default JobCard;
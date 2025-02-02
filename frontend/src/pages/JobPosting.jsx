import React from "react";
import JobCard from "../components/postCards";
import "./JobPosting.css"; // We'll create this CSS file next

const JobPosting = () => {
  // Example job data (replace with real data or fetch from an API)
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Corp",
      location: "Remote",
      description: "We are looking for a skilled software engineer to join our team.",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovate Inc",
      location: "Remote",
      description: "Join us as a product manager to drive innovation and growth.",
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "DataWorks",
      location: "Lahore, Punjab",
      description: "We need a data scientist to analyze and interpret complex data.",
    },
  ];

  const handleApply = (jobId) => {
    alert(`Applying for job ID: ${jobId}`);
  };

  return (
    <div className="job-posting-page">
      <h1>Job Postings</h1>
      <div className="job-list">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            company={job.company}
            location={job.location}
            description={job.description}
            onApply={() => handleApply(job.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default JobPosting;
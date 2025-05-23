import React, { useEffect, useState } from "react";
import JobCard from "../components/postCards";
import "./JobPosting.css";

const JobPosting = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/job-posts")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

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

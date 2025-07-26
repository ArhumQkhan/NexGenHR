import React, { useEffect, useState } from "react";
import JobCard from "../components/postCards";
import "./JobPosting.css";
import { motion } from "framer-motion";

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
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <JobCard
              title={job.title}
              company={job.company}
              location={job.location}
              description={job.description}
              onApply={() => handleApply(job.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobPosting;

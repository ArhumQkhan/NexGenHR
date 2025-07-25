import React, { useEffect, useState } from 'react';

const AdminJobPostList = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:3001/job-posts');
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error('Failed to fetch job posts:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this job post?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3001/job-posts/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      alert(data.message);
      fetchJobs(); // Reload after deletion
    } catch (error) {
      console.error('Failed to delete job post:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Posted Jobs</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <tr key={job.id}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{job.description}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No job posts available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobPostList;

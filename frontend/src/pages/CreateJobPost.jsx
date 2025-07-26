import React, { useState } from 'react';
//import './CreateJobPost.css'; // optional for styles

const CreateJobPost = () => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/job-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      alert(data.message);
      setForm({ title: '', company: '', location: '', description: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to create job post');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Job Post</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} className="form-control mb-2" placeholder="Job Title" required />
        <input name="company" value={form.company} onChange={handleChange} className="form-control mb-2" placeholder="Company" required />
        <input name="location" value={form.location} onChange={handleChange} className="form-control mb-2" placeholder="Location" required />
        <textarea name="description" value={form.description} onChange={handleChange} className="form-control mb-3" placeholder="Description" />
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default CreateJobPost;

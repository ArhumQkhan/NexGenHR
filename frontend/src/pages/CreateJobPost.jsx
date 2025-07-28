import React, { useState } from 'react';
import './CreateJobPost.css';

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
    <div className="create-job-form-container">
      <h2 className="create-job-form-title">Create Job Post</h2>
      <form onSubmit={handleSubmit} className="create-job-form">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" required />
        <input name="company" value={form.company} onChange={handleChange} placeholder="Company" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={4} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateJobPost;

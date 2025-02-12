import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router
import './app.css'; // Your custom CSS

// Components from the first frontend
import Employee from './Employee';
import AddEmployee from './AddEmployee';
import ShowEmployee from './ShowEmployee';
import Invoice from './Invoice';

// Components from the second frontend
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import JobPosting from './pages/JobPosting';
import HeroSection from './components/HeroSection';
import EmployeeLogin from './pages/EmployeeLogin';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar /> {/* Navbar from the second frontend */}
        <Layout> {/* Layout from the second frontend */}
          <Routes>
            {/* Routes from the second frontend */}
            <Route path="/" element={<HeroSection />} />
            <Route path="/job-posting" element={<JobPosting />} />
            <Route path="/employee-login" element={<EmployeeLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Routes from the first frontend */}
            <Route path="/employee" element={<Employee />} />
            <Route path="/invoice/:id" element={<Invoice />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/show/:id" element={<ShowEmployee />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
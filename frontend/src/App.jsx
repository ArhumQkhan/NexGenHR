import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // React Router
import './app.css'; // Your custom CSS

// Components from the old frontend
import Employee from './Employee';
import AddEmployee from './AddEmployee';
import ShowEmployee from './ShowEmployee';
import Invoice from './Invoice';
import EmployeeDashboard from '../EmployeeDashboard';
import './components/layout.css'; 
// Components from the new frontend
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import JobPosting from './pages/JobPosting';
import HeroSection from './components/HeroSection';
import EmployeeLogin from './pages/EmployeeLogin';
import AdminLogin from './pages/AdminLogin';
import CreateJobPost from './pages/CreateJobPost';


function App() {
  const location = useLocation(); 

  
  const showNavbarRoutes = ["/", "/job-posting", "/employee-login", "/admin-login"];

  
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {shouldShowNavbar && <Navbar />} 
      <Layout> 
        <Routes>
          
          <Route path="/" element={<HeroSection />} />
          <Route path="/job-posting" element={<JobPosting />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          
          <Route path="/employeedash/:id" element={<EmployeeDashboard/>}/>
          <Route path="/employee" element={<Employee />} />
          <Route path="/employee/invoice/:id" element={<Invoice />} />
          <Route path="/employee/add-employee" element={<AddEmployee />} />
          <Route path="/employee/show/:id" element={<ShowEmployee />} />
          <Route path="/admin/create-job" element={<JobAdminPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Layout>
    </div>
  );
}


function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
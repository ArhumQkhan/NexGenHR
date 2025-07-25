import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './app.css';
import './components/layout.css';

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import HeroSection from './components/HeroSection';
import JobPosting from './pages/JobPosting';
import EmployeeLogin from './pages/EmployeeLogin';
import AdminLogin from './pages/AdminLogin';
import Employee from './Employee';
import AddEmployee from './AddEmployee';
import ShowEmployee from './ShowEmployee';
import Invoice from './Invoice';
import EmployeeDashboard from '../EmployeeDashboard';
import CreateJobPost from './pages/CreateJobPost';

// 🌟 NEW Wrapper for AOS & location-aware rendering
function AppWrapper() {
  const location = useLocation();
  const showNavbarRoutes = ["/", "/job-posting","/employee-login", "/admin-login"];
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);
  const showFooterRoutes = ["/", "/job-posting","/employee-login", "/admin-login"]; 
  const shouldShowFooter = showFooterRoutes.includes(location.pathname);


  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    AOS.refresh(); // Re-trigger AOS animations on route change
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      const scrollBar = document.querySelector('.scroll-bar');
      if (scrollBar) scrollBar.style.width = `${scrollPercent}%`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      <div className="scroll-bar"></div>
      {shouldShowNavbar && <Navbar />}
      <Layout>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/job-posting" element={<JobPosting />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/employeedash/:id" element={<EmployeeDashboard />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/employee/invoice/:id" element={<Invoice />} />
          <Route path="/employee/add-employee" element={<AddEmployee />} />
          <Route path="/employee/show/:id" element={<ShowEmployee />} />
          <Route path="/admin/create-job" element={<CreateJobPost />} />
        </Routes>
      </Layout>
    </div>
  );
}

// Root includes Router
function Root() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default Root;
// "/employee-login"
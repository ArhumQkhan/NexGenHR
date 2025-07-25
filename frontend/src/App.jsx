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

// Components from the new frontend
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import JobPosting from './pages/JobPosting';
import HeroSection from './components/HeroSection';
import EmployeeLogin from './pages/EmployeeLogin';
import AdminLogin from './pages/AdminLogin';

///Job post///
import CreateJobPost from './pages/CreateJobPost';

function App() {
  const location = useLocation(); // Get the current route

  // Define routes where the Navbar should be shown
  const showNavbarRoutes = ["/", "/job-posting", "/employee-login", "/admin-login"];

  // Check if the current route is in the showNavbarRoutes array
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {shouldShowNavbar && <Navbar />} {/* Conditionally render Navbar */}
      <Layout> {/* Layout from the new frontend */}
        <Routes>
          {/* Routes from the new frontend */}
          <Route path="/" element={<HeroSection />} />
          <Route path="/job-posting" element={<JobPosting />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Routes from the old frontend */}
          <Route path="/employeedash/:id" element={<EmployeeDashboard/>}/>
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

// Wrap the App component with Router
function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
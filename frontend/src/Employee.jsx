Employee.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component"; // Importing React Data Table Component
import "./Employee.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lottie from "lottie-react";
import totalEmployeesAnim from "./assets/lotties/totalEmployee.json";
import newAnim from "./assets/lotties/newEmployee.json";
import appliAnim from "./assets/lotties/jobApplications.json";
import addEmployeeAnim from "./assets/lotties/addemployeeanim.json";
import Topbar from "./components/Topbar";
import {
  faEye,
  faTrashCan,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Employee() {
  const [employee, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pdfCount, setPdfCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/admin-login", { replace: true }); // Redirect if no token
    }
    fetchEmployees();
    fetchPdfCount();
  }, []);


  const fetchPdfCount = async () => {
  try {
    const response = await axios.get("http://localhost:3000/upload-count");
    setPdfCount(response.data.count); // 👈 This sets the number of PDFs
  } catch (error) {
    console.error("Failed to fetch PDF count:", error);
  }
  }; 
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/employee`);
      setEmployee(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // ✅ Clear auth token (or whatever key you used)
    navigate("/admin-login", { replace: true });
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      fetchEmployees();
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/employee/search`,
        {
          params: { q: searchTerm },
        }
      );
      setEmployee(response.data);
    } catch (error) {
      console.error(error);
    }
  };

// counting number of active employees
const activeCount = employee.filter(emp => emp.em_status === "ACTIVE").length;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/employee/${id}`);
      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  // Define columns for the DataTable
  const columns = [
    {
      name: "ID",
      selector: (row) => row.employee_id,
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.em_email,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-inline-flex gap-2">
          <Link to={`show/${row.employee_id}`} className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faEye} />
          </Link>
          <Link
            to={`invoice/${row.employee_id}`}
            className="btn btn-outline-dark"
          >
            <FontAwesomeIcon icon={faMoneyCheckDollar} />
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(row.employee_id)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      ),
    },
  ];

  const [performanceFilter, setPerformanceFilter] = useState('monthly');

  const monthlyPerformanceData = [
    { date: "July 1", performance: 60 },
    { date: "July 2", performance: 45 },
    { date: "July 3", performance: 70 },
    { date: "July 4", performance: 50 },
    { date: "July 5", performance: 80 },
  ];

  const weeklyPerformanceData = [
    { date: "Week 1", performance: 75 },
    { date: "Week 2", performance: 65 },
    { date: "Week 3", performance: 85 },
    { date: "Week 4", performance: 70 },
  ];

  const getPerformanceData = () => {
    return performanceFilter === 'monthly' ? monthlyPerformanceData : weeklyPerformanceData;
  };

  const performanceData = getPerformanceData();

const attendanceData = [
  { name: "Present", value: 80 },
  { name: "On Leave", value: 10 },
  { name: "Absent", value: 5 },
  { name: "Holiday", value: 5 },
];

const attendanceColors = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  if (!localStorage.getItem("authToken")) {
    return null; // or a loading spinner
  }

    return (
  <>
    <Topbar />

    <div className="employee-container3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', width: '100vw', background: '#f7fafd' }}>
      <div className="data" style={{ width: '90%', maxWidth: '1500px', margin: '2rem auto', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', padding: '2.5rem 2.5rem 2rem 2.5rem', minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        <div className="dashboard-header-container">
  
          <div className="dashboard-search">
            <input
              type="text"
              placeholder="Search something..."
              className="dashboard-search-input"
            />
            <button className="dashboard-search-btn">Search</button>
          </div>
          <div className="dashboard-header-row">
            <div className="dashboard-left">
              <h2 className="dashboard-title">DASHBOARD</h2>
              <p className="dashboard-subtext">Here is today’s report and performance summary.</p>
            </div>
            <div className="dashboard-date">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <Lottie animationData={totalEmployeesAnim} loop={true} style={{ height: 100 }} />
            <h3>Total Employees</h3>
            <p className="card-number">{activeCount}</p>
            <p className="card-subtext">+2% from last quarter</p>
          </div>

          <div className="dashboard-card">
            <Lottie animationData={newAnim} loop={true} style={{ height: 100 }} />
            <h3>New Employees</h3>
            <p className="card-number">0</p>
            <p className="card-subtext">+0% this month</p>
          </div>

          <div className="dashboard-card">
            <Lottie animationData={appliAnim} loop={true} style={{ height: 100 }} />
            <h3>Job Applications</h3>
            <p className="card-number">{pdfCount}</p>
            <p className="card-subtext">+0% from last quarter</p>
          </div>
        </div>
        <div className="dashboard-charts">
          {/* Add Employee Card */}
          <div className="chart-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Left side: heading and button */}
            <div style={{ flex: 2, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: '100%' }}>
              <h3 style={{ color: '#111', fontWeight: 550, marginBottom: '1.2rem', marginTop: 0 }}>Add New Employee</h3>
              <p style={{ color: '#444', fontSize: '1.05rem', marginBottom: '1.2rem', maxWidth: '90%' }}>
                Easily add a new employee by entering their Name, Salary, Contact Information, and other details. This quick process helps you keep your records up to date and makes onboarding seamless for the admin.
              </p>
              <button
                className="btn btn-primary wiggle-on-hover"
                style={{ fontSize: '1.1rem', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 600, width: '76%', transition: 'transform 2s' }}
                onClick={() => navigate('/employee/add')}
              >
                + Add Employee
              </button>
            </div>
            {/* Right side: animation */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Lottie animationData={addEmployeeAnim} loop={true} style={{ height: 320, maxWidth: 420 }} />
            </div>
          </div>

          {/* Employee Attendance Chart Card (unchanged) */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Employee Attendance</h3>
            </div>
            <PieChart width={400} height={300} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} position="outside"
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={attendanceColors[index % attendanceColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="attendance-legend">
              {attendanceData.map((entry, index) => (
                <div key={`legend-${index}`} className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: attendanceColors[index % attendanceColors.length] }}></span>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <h3 className="employees-table-heading">Employees</h3>
        <DataTable
          columns={columns}
          data={employee}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
          highlightOnHover
          striped
          responsive
        />
      </div>
    </div>
  </>
 );
}
export default Employee;

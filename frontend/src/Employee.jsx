import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component"; // Importing React Data Table Component
import "./Employee.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrashCan,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";

function Employee() {
  const [employee, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/employee`);
      setEmployee(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Clear auth token (or whatever key you used)
    navigate("/admin-login"); // ✅ Redirect to login page
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      fetchEmployees();
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3001/employee/search`,
        {
          params: { q: searchTerm },
        }
      );
      setEmployee(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/employee/${id}`);
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

  return (
    <div className="employee-container1">
      <div className="employee-container2">
        <div className="leftNav">
          <Link to="/employee" className="leftNavBtn">
            Home
          </Link>
          <a
            href="http://localhost:8501"
            className="leftNavBtn"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV Screening
          </a>
          <Link to="/admin/create-job" className="leftNavBtn">
            Job Posting
          </Link>
          <button className="leftNavBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="employee-container3">
        <div className="data">
          <div className="custom">
            <Link
              to="/employee/add-employee"
              className="custom-btn custom-btn-success"
            >
              Add +
            </Link>
            <div className="custom-input-group">
              <input
                type="text"
                className="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn searchBtn"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={employee}
            pagination // Enables pagination
            paginationPerPage={5} // Number of rows per page
            paginationRowsPerPageOptions={[5, 10, 15]} // Dropdown options for rows per page
            highlightOnHover // Adds a hover effect to rows
            striped // Adds striped row styling
            responsive // Makes the table responsive
          />
        </div>
      </div>
    </div>
  );
}

export default Employee;

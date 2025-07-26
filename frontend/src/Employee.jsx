import React, { useEffect, useState } from "react";
import AdminSidebar from "./components/adminSidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component"; 
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
    localStorage.removeItem("token"); 
    navigate("/admin-login"); 
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
const customStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  },
  headRow: {
    style: {
      backgroundColor: "transparent",
    },
  },
  rows: {
    style: {
      backgroundColor: "transparent",
    },
  },
};

return (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    {/* Sidebar */}
    <AdminSidebar />

    {/* Main Content */}
    <div style={{ flex: 1, padding: "20px" }}>
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
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15]}
            highlightOnHover
            striped
            responsive
            customStyles={customStyles}
          />

        </div>
      </div>
    </div>
  </div>
);
}
export default Employee;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeCardEditable from "./src/components/employeeCardsEditable";
import EmployeeDashboardTopbar from "./src/components/EmployeeDashboardTopbar";
import "./src/ShowEmployee.css";

export default function EmployeeDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employeedash/${id}`)
      .then((res) => {
        setFormData(res.data[0] || {});
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load employee data");
        setLoading(false);
      });
  }, [id]);

  const handleEdit = (field) => setEditField(field);
  const handleSave = async (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    try {
      await axios.put(
        `http://localhost:3000/employeedash/update/${id}`,
        updatedData
      );
      setEditField(null);
    } catch (error) {
      setError("Failed to update employee data");
    }
  };
  const handleKeyDown = (event, field) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave(field, formData[field]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/employee-login", { replace: true });
  };

  if (loading) {
    return (
      <>
        <EmployeeDashboardTopbar onLogout={handleLogout} />
        <div className="show-wrapper">
          <div style={{ textAlign: "center", padding: "50px" }}>
            <div className="loading-spinner"></div>
            <p>Loading employee data...</p>
          </div>
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <EmployeeDashboardTopbar onLogout={handleLogout} />
        <div className="show-wrapper">
          <div
            style={{
              textAlign: "center",
              padding: "50px",
              color: "red",
            }}
          >
            <p>{error}</p>
            <button
              className="back-button"
              onClick={() => navigate("/employee")}
            >
              Back
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <EmployeeDashboardTopbar onLogout={handleLogout} />
      <div className="show-wrapper">
        <div
          className="dashboard-header"
          style={{ textAlign: "center", margin: "2rem 0" }}
        >
          <h2>Welcome, {formData.first_name}!</h2>
          <p>Here's your profile information.</p>
        </div>
        <div className="show-card-row">
          <EmployeeCardEditable
            label="Employee ID"
            value={formData.employee_id}
            isEditable={false}
          />
          <EmployeeCardEditable
            label="First Name"
            value={formData.first_name}
            isEditable={editField === "first_name"}
            onSave={(val) => handleSave("first_name", val)}
          />
          <EmployeeCardEditable
            label="Last Name"
            value={formData.last_name}
            isEditable={editField === "last_name"}
            onSave={(val) => handleSave("last_name", val)}
          />
          <EmployeeCardEditable
            label="Gender"
            value={formData.em_gender}
            isEditable={editField === "em_gender"}
            onSave={(val) => handleSave("em_gender", val)}
          />
          <EmployeeCardEditable
            label="Status"
            value={formData.em_status}
            isEditable={editField === "em_status"}
            onSave={(val) => handleSave("em_status", val)}
          />
          <EmployeeCardEditable
            label="Email"
            value={formData.em_email}
            isEditable={editField === "em_email"}
            onSave={(val) => handleSave("em_email", val)}
          />
          <EmployeeCardEditable
            label="Address"
            value={formData.em_address}
            isEditable={editField === "em_address"}
            onSave={(val) => handleSave("em_address", val)}
          />
          <EmployeeCardEditable
            label="Phone Number"
            value={formData.em_phone}
            isEditable={editField === "em_phone"}
            onSave={(val) => handleSave("em_phone", val)}
          />
          <EmployeeCardEditable
            label="Date of Birth"
            value={formData.em_birthday}
            isEditable={editField === "em_birthday"}
            onSave={(val) => handleSave("em_birthday", val)}
          />
          <EmployeeCardEditable
            label="Salary"
            value={formData.em_salary}
            isEditable={editField === "em_salary"}
            onSave={(val) => handleSave("em_salary", val)}
          />
        </div>
      </div>
    </>
  );
}

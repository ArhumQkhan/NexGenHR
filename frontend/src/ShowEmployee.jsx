import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Topbar from "./components/Topbar";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import EmployeeCardEditable from './components/employeeCardsEditable';

import './ShowEmployee.css';

export default function ShowEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showEmployee, setShowEmployee] = useState([]);
    const [editField, setEditField] = useState(null); // State to track which field is in edit mode
    const [formData, setFormData] = useState({}); // State to store the updated form data

    useEffect(() => {
        axios.get(`http://localhost:3000/employee/show/${id}`)
            .then(res => {
                setShowEmployee(res.data);
                setFormData(res.data[0]); // Initialize form data with fetched employee details
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleEdit = (field) => {
        setEditField(field); // Set the field in edit mode
    };

    const handleSave = async (field, value) => {
        const updatedData = { ...formData, [field]: value }; // Update the specific field in formData
        setFormData(updatedData); // Update local state

        try {
            await axios.put(`http://localhost:3000/employee/update/${id}`, updatedData); // Send updated data to backend
            setEditField(null); // Exit edit mode
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyDown = (event, field) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents default form behavior
            console.log(`Enter key pressed for field: ${field}`); // Debugging message
            handleSave(field, formData[field]); // Save the data when 'Enter' is pressed
        }
    };

  return (
    <>
      <Topbar />

      <div className="show-wrapper">
        <div className="show-card-row">
          <EmployeeCardEditable
            label="Employee ID"
            value={formData.employee_id}
          />
          <EmployeeCardEditable
            label="First Name"
            value={formData.first_name}
            isEditable
            onSave={(val) => handleSave("first_name", val)}
          />
          <EmployeeCardEditable
            label="Last Name"
            value={formData.last_name}
            isEditable
            onSave={(val) => handleSave("last_name", val)}
          />
        </div>

        <div className="show-card-row">
          <EmployeeCardEditable
            label="Gender"
            value={formData.em_gender}
            isEditable
            onSave={(val) => handleSave("em_gender", val)}
          />
          <EmployeeCardEditable
            label="Status"
            value={formData.em_status}
            isEditable
            onSave={(val) => handleSave("em_status", val)}
          />
        </div>

        <div className="show-card-row">
          <EmployeeCardEditable
            label="Email"
            value={formData.em_email}
            isEditable
            onSave={(val) => handleSave("em_email", val)}
          />
          <EmployeeCardEditable
            label="Address"
            value={formData.em_address}
            isEditable
            onSave={(val) => handleSave("em_address", val)}
          />
        </div>

        <div className="show-card-row">
          <EmployeeCardEditable
            label="Phone Number"
            value={formData.em_phone}
            isEditable
            onSave={(val) => handleSave("em_phone", val)}
          />
          <EmployeeCardEditable
            label="Date of Birth"
            value={formData.em_birthday}
            isEditable
            onSave={(val) => handleSave("em_birthday", val)}
          />
          <EmployeeCardEditable
            label="Salary"
            value={formData.em_salary}
            isEditable
            onSave={(val) => handleSave("em_salary", val)}
          />
        </div>
      </div>
    </>
  );
}



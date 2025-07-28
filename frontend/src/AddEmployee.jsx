import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Topbar from "./components/Topbar";
import EmployeeCardEditable from './components/employeeCardsEditable';
import './ShowEmployee.css';

export default function AddEmployee() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        em_email: '',
        em_address: '',
        em_status: 'ACTIVE',
        em_gender: 'Male',
        em_phone: '',
        em_birthday: '',
        em_salary: ''
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleFieldChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            await axios.post('http://localhost:3000/employee/add-employee', formData);
            navigate('/employee');
        } catch (err) {
            setError('Failed to add employee.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <Topbar />
            <div className="show-wrapper">
                <h2 style={{ textAlign: 'center', fontWeight: 700, marginBottom: 32, color: '#3a9bed', letterSpacing: 1 }}>Add Employee</h2>
                <div className="show-card-row">
                    <EmployeeCardEditable
                        label="First Name"
                        value={formData.first_name}
                        isEditable={true}
                        onChange={(val) => handleFieldChange("first_name", val)}
                    />
                    <EmployeeCardEditable
                        label="Last Name"
                        value={formData.last_name}
                        isEditable={true}
                        onChange={(val) => handleFieldChange("last_name", val)}
                    />
                    <EmployeeCardEditable
                        label="Gender"
                        value={formData.em_gender}
                        isEditable={true}
                        onChange={(val) => handleFieldChange("em_gender", val)}
                        fieldType="gender"
                    />
                    <EmployeeCardEditable
                        label="Status"
                        value={formData.em_status}
                        isEditable={true}
                        onChange={(val) => handleFieldChange("em_status", val)}
                    />
                    <EmployeeCardEditable
                        label="Email"
                        value={formData.em_email}
                        isEditable={true}
                        onChange={(val) => handleFieldChange("em_email", val)}
                    />
                    <EmployeeCardEditable
                        label="Address"
                        value={formData.em_address}
                        isEditable={true}
                        onChange={(val) => handleFieldChange("em_address", val)}
                    />
                    <EmployeeCardEditable
                        label="Phone Number"
                        value={formData.em_phone}
                        isEditable={true}
                        onChange={(val) => handleFieldChange("em_phone", val)}
                    />
                    <EmployeeCardEditable
                        label="Date of Birth"
                        value={formData.em_birthday}
                        isEditable={true}
                        onChange={(val) => handleFieldChange("em_birthday", val)}
                        fieldType="date"
                    />
                    <EmployeeCardEditable
                        label="Salary"
                        value={formData.em_salary}
                        isEditable={true}
                        onChange={(val) => handleFieldChange("em_salary", val)}
                    />
                </div>
                <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <button className="save-all-button" onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : 'Save Employee'}
                    </button>
                    {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
                </div>
            </div>
        </>
    );
}

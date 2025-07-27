import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from "./components/Topbar";
import EmployeeCardEditable from './components/employeeCardsEditable';

import './ShowEmployee.css';

export default function ShowEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showEmployee, setShowEmployee] = useState([]);
    const [formData, setFormData] = useState({}); // State to store the updated form data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false); // Global edit mode state
    const [tempFormData, setTempFormData] = useState({}); // Temporary data for editing

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await axios.get(`http://localhost:3000/employee/show/${id}`);
                setShowEmployee(res.data);
                if (res.data && res.data.length > 0) {
                    setFormData(res.data[0]); // Initialize form data with fetched employee details
                    setTempFormData(res.data[0]); // Initialize temp data as well
                }
            } catch (err) {
                console.error('Error fetching employee:', err);
                setError('Failed to load employee data');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleEditClick = () => {
        setIsEditMode(true);
        setTempFormData({ ...formData }); // Copy current data to temp
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setTempFormData({ ...formData }); // Reset temp data to original
    };

    const handleSaveAll = async () => {
        try {
            await axios.put(`http://localhost:3000/employee/update/${id}`, tempFormData);
            setFormData({ ...tempFormData }); // Update main form data
            setIsEditMode(false);
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleFieldChange = (field, value) => {
        setTempFormData(prev => ({ ...prev, [field]: value }));
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD for display
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD for input
    };

    if (loading) {
        return (
            <>
                <Topbar />
                <div className="show-wrapper">
                    <div style={{ textAlign: 'center', padding: '50px' }}>
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
                <Topbar />
                <div className="show-wrapper">
                    <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
                        <p>{error}</p>
                        <button className="retry-button" onClick={() => window.location.reload()}>Retry</button>
                    </div>
                </div>
            </>
        );
    }

    if (!showEmployee || showEmployee.length === 0) {
        return (
            <>
                <Topbar />
                <div className="show-wrapper">
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <p>Employee not found</p>
                        <button className="back-button" onClick={() => navigate('/employee')}>Back to Employee List</button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Topbar />

            <div className="show-wrapper">
                <div className="show-header">
                    <button className="back-button" onClick={() => navigate('/employee')}>
                        ← Back to Employee List
                    </button>
                    <div className="edit-controls">
                        {!isEditMode ? (
                            <button className="edit-all-button" onClick={handleEditClick}>
                                Edit Employee
                            </button>
                        ) : (
                            <>
                                <button className="save-all-button" onClick={handleSaveAll}>
                                    Save Changes
                                </button>
                                <button className="cancel-edit-button" onClick={handleCancelEdit}>
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="show-card-row">
                    <EmployeeCardEditable
                        label="Employee ID"
                        value={String(formData.employee_id || '')}
                        isEditable={false}
                    />
                    <EmployeeCardEditable
                        label="First Name"
                        value={isEditMode ? String(tempFormData.first_name || '') : String(formData.first_name || '')}
                        isEditable={isEditMode}
                        onChange={(val) => handleFieldChange("first_name", val)}
                    />
                    <EmployeeCardEditable
                        label="Last Name"
                        value={isEditMode ? String(tempFormData.last_name || '') : String(formData.last_name || '')}
                        isEditable={isEditMode}
                        onChange={(val) => handleFieldChange("last_name", val)}
                    />
                    <EmployeeCardEditable
                        label="Gender"
                        value={isEditMode ? String(tempFormData.em_gender || '') : String(formData.em_gender || '')}
                        isEditable={isEditMode}
                        onChange={(val) => handleFieldChange("em_gender", val)}
                        fieldType="gender"
                    />
                    <EmployeeCardEditable
                        label="Status"
                        value={isEditMode ? String(tempFormData.em_status || '') : String(formData.em_status || '')}
                        isEditable={isEditMode}
                        onChange={(val) => handleFieldChange("em_status", val)}
                    />
                    <EmployeeCardEditable
                        label="Email"
                        value={isEditMode ? String(tempFormData.em_email || '') : String(formData.em_email || '')}
                        isEditable={isEditMode}
                        onChange={(val) => handleFieldChange("em_email", val)}
                    />
                    <EmployeeCardEditable
                        label="Address"
                        value={isEditMode ? String(tempFormData.em_address || '') : String(formData.em_address || '')}
                        isEditable={isEditMode}
                        onChange={(val) => handleFieldChange("em_address", val)}
                    />
                    <EmployeeCardEditable
                        label="Phone Number"
                        value={isEditMode ? String(tempFormData.em_phone || '') : String(formData.em_phone || '')}
                        isEditable={isEditMode}
                        onChange={(val) => handleFieldChange("em_phone", val)}
                    />
                    <EmployeeCardEditable
                        label="Date of Birth"
                        value={isEditMode ? formatDateForInput(tempFormData.em_birthday) : formatDateForDisplay(formData.em_birthday)}
                        isEditable={isEditMode}
                        onChange={(val) => handleFieldChange("em_birthday", val)}
                        fieldType="date"
                    />
                    <EmployeeCardEditable
                        label="Salary"
                        value={isEditMode ? String(tempFormData.em_salary || '') : String(formData.em_salary || '')}
                        isEditable={isEditMode}
                        onChange={(val) => handleFieldChange("em_salary", val)}
                    />
                </div>
            </div>
        </>
    );
}



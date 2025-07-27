import React, { useState, useEffect } from "react";
import "./employeeCardsEditable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck, faXmark, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const EmployeeCardEditable = ({ label, value, isEditable = false, onChange, fieldType = "text" }) => {
  const [localValue, setLocalValue] = useState(value || '');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Update localValue when value prop changes
  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleDateChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleGenderChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (onChange) onChange(newValue);
  };

  const renderField = () => {
    if (!isEditable) {
      return (
        <div className="employee-card-value">
          <span>{localValue}</span>
        </div>
      );
    }

    switch (fieldType) {
      case "gender":
        return (
          <div className="employee-card-edit">
            <select
              value={localValue}
              onChange={handleGenderChange}
              className="employee-card-select"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        );
      
      case "date":
        return (
          <div className="employee-card-edit">
            <div className="date-input-container">
              <input
                type="date"
                value={localValue}
                onChange={handleDateChange}
                className="employee-card-date-input"
                onKeyDown={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
              />
              <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="employee-card-edit">
            <input
              type="text"
              value={localValue}
              onChange={handleInputChange}
              className="employee-card-input"
            />
          </div>
        );
    }
  };

  return (
    <div className={`employee-card ${isEditable ? 'editing' : ''}`}>
      <h4 className="employee-card-label">{label}</h4>
      {renderField()}
    </div>
  );
};

export default EmployeeCardEditable;
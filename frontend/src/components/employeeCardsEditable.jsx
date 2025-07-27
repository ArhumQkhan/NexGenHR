import React, { useState } from "react";
import "./employeeCardEditable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const EmployeeCardEditable = ({ label, value, isEditable = false, onChange, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setLocalValue(value); // Reset to original
  };

  const handleSaveClick = () => {
    setEditing(false);
    if (onSave) onSave(localValue);
  };

  return (
    <div className="employee-card">
      <h4 className="employee-card-label">{label}</h4>

      {!editing ? (
        <div className="employee-card-value">
          <span>{value}</span>
          {isEditable && (
            <button onClick={handleEditClick} className="edit-btn">
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          )}
        </div>
      ) : (
        <div className="employee-card-edit">
          <input
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
          />
          <button onClick={handleSaveClick} className="save-btn">
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button onClick={handleCancel} className="cancel-btn">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeCardEditable;

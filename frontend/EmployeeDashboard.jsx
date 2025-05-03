import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./EmployeeDashboard.css";

export default function EmployeeDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [showEmployee, setShowEmployee] = useState([]);
  const [editField, setEditField] = useState(null); // State to track which field is in edit mode
  const [formData, setFormData] = useState({}); // State to store the updated form data

  useEffect(() => {
    axios
      .get(`http://localhost:3001/employeedash/${id}`)
      .then((res) => {
        setShowEmployee(res.data);
        setFormData(res.data[0]); // Initialize form data with fetched employee details
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // base64 preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // trigger file input click
  };

  const handleEdit = (field) => {
    setEditField(field); // Set the field in edit mode
  };

  const handleSave = async (field, value) => {
    const updatedData = { ...formData, [field]: value }; // Update the specific field in formData
    setFormData(updatedData); // Update local state

    try {
      await axios.put(
        `http://localhost:3001/employeedash/update/${id}`,
        updatedData
      ); // Send updated data to backend
      setEditField(null); // Exit edit mode
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event, field) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents default form behavior
      console.log(`Enter key pressed for field: ${field}`); // Debugging message
      handleSave(field, formData[field]); // Save the data when 'Enter' is pressed
    }
  };

  return (
    <div className="show-container1">
      <div className="show-container3">
        <div className="data">
          <div className="image-container">
            <div className="image-section">
              {image ? (
                <img src={image} alt="Employee" />
              ) : (
                <div onClick={handleImageClick}>
                  Upload Image
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            <div className="name-text">
              <h2>{formData.first_name}</h2>
              <h2>{formData.last_name}</h2>
            </div>
          </div>

          <table className="custom-table">
            <thead>
              <tr>
                <td>#</td>
                <td>Details</td>
              </tr>
            </thead>
            <tbody>
              {Object.keys(formData).length > 0 && (
                <>
                  <tr>
                    <td>ID</td>
                    <td>{formData.employee_id}</td>
                  </tr>

                  {/* Email Row */}
                  <tr>
                    <td className="align-middle">Email</td>
                    <td>
                      {editField === "em_email" ? (
                        <input
                          type="text"
                          value={formData.em_email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              em_email: e.target.value,
                            })
                          }
                          onBlur={() =>
                            handleSave("em_email", formData.em_email)
                          }
                          onKeyDown={(e) => handleKeyDown(e, "em_email")} // Listen for Enter key
                          autoFocus
                        />
                      ) : (
                        <>
                          {formData.em_email}{" "}
                          <button
                            className="btn button-light"
                            onClick={() => handleEdit("em_email")}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>

                  {/* Add similar rows for all other fields like Address, Status, etc. */}

                  {/* Address Row */}
                  <tr>
                    <td className="align-middle">Address</td>
                    <td>
                      {editField === "em_address" ? (
                        <input
                          type="text"
                          value={formData.em_address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              em_address: e.target.value,
                            })
                          }
                          onBlur={() =>
                            handleSave("em_address", formData.em_address)
                          }
                          onKeyDown={(e) => handleKeyDown(e, "em_address")} // Listen for Enter key
                          autoFocus
                        />
                      ) : (
                        <>
                          {formData.em_address}{" "}
                          <button
                            className="btn button-light"
                            onClick={() => handleEdit("em_address")}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>

                  {/* Status Row */}
                  <tr>
                    <td className="align-middle">Status</td>
                    <td>
                      {editField === "em_status" ? (
                        <select
                          value={formData.em_status}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              em_status: e.target.value,
                            })
                          }
                          onBlur={() =>
                            handleSave("em_status", formData.em_status)
                          }
                          onKeyDown={(e) => handleKeyDown(e, "em_status")} // Listen for Enter key
                          autoFocus
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="INACTIVE">INACTIVE</option>
                          <option value="RESIGNED">RESIGNED</option>
                          <option value="RETIRED">RETIRED</option>
                        </select>
                      ) : (
                        <>
                          {formData.em_status}{" "}
                          <button
                            className="btn button-light"
                            onClick={() => handleEdit("em_status")}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>

                  {/* Gender Row */}
                  <tr>
                    <td className="align-middle">Gender</td>
                    <td>
                      {editField === "em_gender" ? (
                        <select
                          value={formData.em_gender}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              em_gender: e.target.value,
                            })
                          }
                          onBlur={() =>
                            handleSave("em_gender", formData.em_gender)
                          }
                          onKeyDown={(e) => handleKeyDown(e, "em_gender")} // Listen for Enter key
                          autoFocus
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>
                      ) : (
                        <>
                          {formData.em_gender}{" "}
                          <button
                            className="btn button-light"
                            onClick={() => handleEdit("em_gender")}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>

                  {/* Phone Number Row */}
                  <tr>
                    <td className="align-middle">Phone no.</td>
                    <td>
                      {editField === "em_phone" ? (
                        <input
                          type="text"
                          value={formData.em_phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              em_phone: e.target.value,
                            })
                          }
                          onBlur={() =>
                            handleSave("em_phone", formData.em_phone)
                          }
                          onKeyDown={(e) => handleKeyDown(e, "em_phone")} // Listen for Enter key
                          autoFocus
                        />
                      ) : (
                        <>
                          {formData.em_phone}{" "}
                          <button
                            className="btn button-light"
                            onClick={() => handleEdit("em_phone")}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>

                  {/* Birthday Row */}
                  <tr>
                    <td className="align-middle">Date of Birth</td>
                    <td>
                      {editField === "em_birthday" ? (
                        <input
                          type="date"
                          value={formData.em_birthday}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              em_birthday: e.target.value,
                            })
                          }
                          onBlur={() =>
                            handleSave("em_birthday", formData.em_birthday)
                          }
                          onKeyDown={(e) => handleKeyDown(e, "em_birthday")} // Listen for Enter key
                          autoFocus
                        />
                      ) : (
                        <>
                          {formData.em_birthday}{" "}
                          <button
                            className="btn button-light"
                            onClick={() => handleEdit("em_birthday")}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>

                  {/* Salary Row */}
                  <tr>
                    <td className="align-middle">Salary</td>
                    <td>
                      {editField === "em_salary" ? (
                        <input
                          type="number"
                          value={formData.em_salary}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              em_salary: e.target.value,
                            })
                          }
                          onBlur={() =>
                            handleSave("em_salary", formData.em_salary)
                          }
                          onKeyDown={(e) => handleKeyDown(e, "em_salary")} // Listen for Enter key
                          autoFocus
                        />
                      ) : (
                        <>
                          {formData.em_salary}{" "}
                          <button
                            className="btn button-light"
                            onClick={() => handleEdit("em_salary")}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

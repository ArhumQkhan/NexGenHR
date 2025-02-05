import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './AddEmployee.css';

export default function AddEmployee() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('ACTIVE');
    const [gender, setGender] = useState('Male');
    const [number, setNumber] = useState('');
    const [dateSelected, setDateSelected] = useState(null);
    const [salary, setSalary] = useState('');
    const [department, setDepartment] = useState('');
    const [designation, setDesignation] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const formattedDate = dateSelected ? dateSelected.toISOString().split('T')[0] : null;
        axios.post('http://localhost:3001/add-employee', {firstName, lastName, email, address, status, gender, number, dateSelected: formattedDate, salary}) //these parameters should be same as in useState
        .then (res => {
            console.log(res);
            navigate('/'); //to navigate back to homepage after submitting
        }).catch(err => console.log(err))
    }

    return (
        <div className='add-container'>
            <div className='add-container2'>
                <div className='leftNav'>
                    <Link to="/" className='leftNavBtn'>Home</Link>
                    <Link className='leftNavBtn'>CV screening</Link>
                    <Link className='leftNavBtn'>Job posting</Link>
                </div>
            </div>
            <div className='add-container3'>
                <div className='add-form'>
                    <h3>Add Employee</h3>
                    <div className='box'>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="Fname" className="form-label text-white">First Name</label>
                                <input type="text" className="form-control" id="Fname" onChange={e => setFirstName(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="Lname" className="form-label text-white">Last Name</label>
                                <input type="text" className="form-control" id="Lname" onChange={e => setLastName(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="E-mail" className="form-label text-white">E-mail</label>
                                <input type="email" className="form-control" id="E-mail" onChange={e => setEmail(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="Address" className="form-label text-white">Address</label>
                                <input type="text" className="form-control" id="Address" onChange={e => setAddress(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="status" className="form-label text-white">Status</label>
                                <select className="form-select" id="status" value={status} onChange={e => setStatus(e.target.value)}>
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                    <option value="RESIGNED">Resigned</option>
                                    <option value="RETIRED">Retired</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label text-white">Gender</label>
                                <select className="form-select" id="gender" value={gender} onChange={e => setGender(e.target.value)}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label text-white">Phone Number</label>
                                <input type="tel" className="form-control" id="phone" pattern='[0-9]{11}' onChange={e => setNumber(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="department" className="form-label text-white">Department</label>
                                <select className="form-select" id="department" value={department} onChange={e => setDepartment(e.target.value)}>
                                    <option value="IT">IT</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Management">Management</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="designation" className="form-label text-white">Designation</label>
                                <select className="form-select" id="designation" value={designation} onChange={e => setDesignation(e.target.value)}>
                                    {department === 'IT' && (
                                        <>
                                            <option value="Sr. Mobile Dev">Sr. Mobile Dev</option>
                                            <option value="Jr. Mobile Dev">Jr. Mobile Dev</option>
                                            <option value="Sr. Web Dev">Sr. Web Dev</option>
                                            <option value="Jr. Web Dev">Jr. Web Dev</option>
                                        </>
                                    )}
                                    {department === 'Sales' && (
                                        <>
                                            <option value="Sales Supervisor">Sales Supervisor</option>
                                            <option value="Sales Associate">Sales Associate</option>
                                            <option value="Sales Engineer">Sales Engineer</option>
                                            <option value="Account Manager">Account Manager</option>
                                        </>
                                    )}
                                    {department === 'Management' && (
                                        <>
                                            <option value="Office Manager">Office Manager</option>
                                            <option value="Department Manager">Department Manager</option>
                                            <option value="Assistant Manager">Assistant Manager</option>
                                            <option value="Social Media Manager">Social Media Manager</option>
                                            <option value="Trainee Manager">Trainee Manager</option>
                                        </>
                                    )}
                                    {department === 'Marketing' && (
                                        <>
                                            <option value="Chief Marketing Officer">Chief Marketing Officer</option>
                                            <option value="Marketing Specialist">Marketing Specialist</option>
                                            <option value="Copywriter/Content Creator">Copywriter/Content Creator</option>
                                            <option value="SEO Specialist">SEO Specialist</option>
                                        </>
                                    )}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="salary" className="form-label text-white">Salary</label>
                                <input type="text" className="form-control" id="salary" onChange={e => setSalary(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="birth" className="form-label text-white">Date of Birth</label>
                                <Datepicker
                                    className="form-control"
                                    id="birth"
                                    selected={dateSelected}
                                    onChange={date => setDateSelected(date)}
                                    dateFormat="yyyy-MM-dd"
                                    showYearDropdown
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={!firstName || !lastName || !email || !salary}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

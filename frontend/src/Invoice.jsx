import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import { differenceInCalendarDays, eachDayOfInterval, isWeekend } from 'date-fns'; // Function to calculate date difference
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "./Invoice.css";

function Salary() {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});  // Single employee object
    const [grossSalary, setGrossSalary] = useState(0);
    const [netSalary, setNetSalary] = useState(0);
    const [startDate, setStartDate] = useState(null); // Starting date
    const [endDate, setEndDate] = useState(null);     // Ending date
    const [daysBetween, setDaysBetween] = useState(0); // Days between dates
    const [workingDays, setWorkingDays] = useState(0); // Working days excluding weekends
    const [conveyAllowance, setConveyAllowance] = useState(0);
    const [houseAllowance, setHouseAllowance] = useState(0);
    const [conveyPercentage, setConveyPercentage] = useState(false); // State to toggle between amount and percentage mode
    const [housePercentage, setHousePercentage] = useState(false);
    const [providentPercentage, setProvidentPercentage] = useState(false);
    const [providentFund, setProvidentFund] = useState(0);
    const [leaveDeduction, setLeaveDeduction] = useState(0);
    const [monthlyIncomeTax, setMonthlyIncomeTax] = useState(0);


    

    useEffect(() => {
        // Fetch employee data from API
            axios.get(`http://localhost:3001/invoice/${id}`)
            .then(response => {
                setEmployee(response.data);
                calculateDaysBetween(response.data);
                calculateWorkingDays(response.data);
            })
            .catch(error => console.log(error));
    }, [id]);

    const printPDF = () => {
        const input = document.getElementById('salary-section'); // capture the section you want as PDF
        html2canvas(input, {scale:3}).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            // You can adjust the image dimensions and position here
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`salary-details-${employee.first_name}.pdf`);
        });
    };


    // Function to calculate the number of working days excluding weekends
    const calculateWorkingDays = (start, end) => {
        if (start && end) {
            // Generate an array of all dates between start and end
            const allDays = eachDayOfInterval({ start, end });

            // Filter out weekends (Saturday, Sunday)
            const weekdays = allDays.filter(day => !isWeekend(day));
            // Set the total number of weekdays (working days)
            setWorkingDays(weekdays.length);
        }
    };

    // Function to calculate the number of days between start and end dates
    let calculateDaysBetween = (start, end) => {
        if (start && end) {
            const difference = differenceInCalendarDays(end, start);
            setDaysBetween(difference);
        }
    };

    // Calculate final salary when `workingDays`, `employee`, or other relevant states change
    useEffect(() => {
        if (employee && employee.em_salary && workingDays > 0) {
            calculateFinalSalary(employee);
            // calculateIncomeTax(employee.em_salary);
        }
    }, [employee, workingDays, conveyAllowance, houseAllowance, conveyPercentage]);

    // Calculate net salary whenever gross salary is updated
    useEffect(() => {
        if (employee && grossSalary > 0) {
            calculateIncomeTax(grossSalary); // Calculate tax when gross salary changes
            calculatedNetSalary(employee);
        }
    }, [grossSalary, providentFund]); // Trigger net salary calculation when gross salary changes


    const calculateFinalSalary = (employeeData) => {
        const { em_salary = 0} = employeeData;

        let conveyAmount = 0;
        let houseAmount = 0;
        let mealAmount = 0;
        let medicalAmount = 0;

        //for Convey Allowance
        if (conveyPercentage) {
            // Calculate conveyance allowance as a percentage of the base salary
            conveyAmount = ((em_salary * parseFloat(conveyAllowance)) / 100);
        } else {
            // Use conveyance allowance as a fixed amount
            conveyAmount = parseFloat(conveyAllowance);
        }

        //For House Rent Allowance
        if (housePercentage) {
            // Calculate house allowance as a percentage of the base salary
            houseAmount = ((em_salary * parseFloat(houseAllowance)) / 100);
        } else {
            // Use house allowance as a fixed amount
            houseAmount = parseFloat(houseAllowance);
        }

        // Only calculate the deduction if there are valid working days
        if (workingDays > 0) {
            const calculatedgrossSalary = em_salary + conveyAmount + houseAmount;

            setGrossSalary(calculatedgrossSalary);

        } else {
            // Set final salary to 0 if workingDays is not valid
            setGrossSalary(0);
        }
    };


    // Function to calculate income tax based on gross salary
    const calculateIncomeTax = (grossSalary) => {
        let annualSalary = grossSalary * 12; // Convert monthly salary to annual
        let incomeTax = 0;

        // Income tax rules based on annual salary
        if (annualSalary <= 600000) {
            incomeTax = 0; // No tax for income up to 600000
        } else if (annualSalary <= 1200000) {
            incomeTax = (annualSalary - 600000) * 0.05; // 5% of amount exceeding 600000
        } else if (annualSalary <= 2200000) {
            incomeTax = 30000 + (annualSalary - 1200000) * 0.15; // 15% of amount exceeding 1200000
        } else if (annualSalary <= 3200000) {
            incomeTax = 180000 + (annualSalary - 2200000) * 0.25; // 25% of amount exceeding 2200000
        } else if (annualSalary <= 4100000) {
            incomeTax = 430000 + (annualSalary - 3200000) * 0.30; // 30% of amount exceeding 3200000
        } else {
            incomeTax = 700000 + (annualSalary - 4100000) * 0.35; // 35% of amount exceeding 4100000
        }

        let monthlyTax = incomeTax / 12; // Convert annual tax to monthly
        setMonthlyIncomeTax(monthlyTax);
    };

    const calculatedNetSalary = (employeeData) => {
        const { em_salary = 0, unpaid_leaves = 0 } = employeeData;

        let providentAmount = 0;

        if (providentPercentage) {
            // Calculate Provident Fund as a percentage of the base salary
            providentAmount = ((em_salary * parseFloat(providentFund)) / 100);
        } else {
            // Use Provident Fund as a fixed amount
            providentAmount = parseFloat(providentFund);
        }

        if (workingDays > 0) {
            const unpaidLeaveDeduction = (em_salary / workingDays) * unpaid_leaves;
            const calculatedNetSalary = grossSalary - unpaidLeaveDeduction - monthlyIncomeTax - providentAmount;
            setLeaveDeduction(unpaidLeaveDeduction);
            setNetSalary(calculatedNetSalary);
        } else {
            // Set net salary to 0 if workingDays is not valid
            setNetSalary(0);
            setLeaveDeduction(0);
        }

    };


    // Toggle between amount mode and percentage mode
    const toggleConveyMode = () => {
        setConveyPercentage(!conveyPercentage);
    };

    const toggleHouseRentMode = () => {
        setHousePercentage(!housePercentage);
    };

    const toggleProvidentMode = () => {
        setProvidentPercentage(!providentPercentage);
    };



    return (
        <div className='invoice-container1'>
            <div className='invoice-container2'>
                <div className='leftNav'>
                    <Link to="/" className='leftNavBtn'>Home</Link>
                    <Link className='leftNavBtn'>CV screening</Link>
                    <Link className='leftNavBtn'>Job posting</Link>
                </div>
            </div>

            <div className='invoice-container3'>
                <div className='data1'>
                    <div className='top'>
                        <button onClick={printPDF}>Download</button>
                    </div>
                    <h3>Company Name</h3>
                    <div id='salary-section' className='print-section'>

                       {/* <table className='custom-table'>
                            <thead>
                                <tr>
                                    <td>Field</td>
                                    <td>Details</td>
                                </tr>
                            </thead>
                            <tbody>
                                    
                                    <tr>
                                        <td>Employee Name</td>
                                        <td>{employee.first_name}</td>
                                    </tr>
                                    <tr>
                                        <td>Base Salary</td>
                                        <td>{employee.em_salary}</td>
                                    </tr>

                                    <tr>
                                        <td>Month (Start Date)</td>
                                        <td>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => {
                                                    setStartDate(date);
                                                    calculateWorkingDays(date, endDate); // Calculate days excluding weekends
                                                    calculateDaysBetween(date, endDate); // Calculate days on start date
                                                }}
                                                placeholderText="Select Start Date"
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Month (End Date)</td>
                                        <td>
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) => {
                                                    setEndDate(date);
                                                    calculateWorkingDays(startDate, date); // Calculate days excluding weekends
                                                    calculateDaysBetween(startDate, date); // Calculate days on end date
                                                }}
                                                placeholderText="Select End Date"
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Total Days</td>
                                        <td>{daysBetween}</td> {/* Display the calculated number of working days 
                                    </tr> 
                                    <tr>
                                        <td>Total Working Days</td>
                                        <td>{workingDays}</td> {/* Display the calculated number of working days 
                                    </tr>                                
                                    <tr>
                                        <td>Paid Leaves</td>
                                        <td>{employee.paid_leaves}</td>
                                    </tr>

                                
                            </tbody> 

                        </table>*/}

                        <div>
                            <h5>{employee.first_name}</h5>
                            {/* <h5>{employee.}</h5> */}

                            <div  className='flex1'>
                                <h5>Month</h5>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => {
                                        setStartDate(date);
                                        calculateWorkingDays(date, endDate); // Calculate days excluding weekends
                                        calculateDaysBetween(date, endDate); // Calculate days on start date
                                    }}
                                    placeholderText="Select Start Date"
                                    dateFormat="yyyy-MM-dd"
                                />
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => {
                                        setEndDate(date);
                                        calculateWorkingDays(startDate, date); // Calculate days excluding weekends
                                        calculateDaysBetween(startDate, date); // Calculate days on end date
                                    }}
                                    placeholderText="Select End Date"
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>

                            <div className='flex2'>
                                <h5>Total Days</h5>
                                {daysBetween}
                                <h5> | </h5>
                                <h5>Total Working Days</h5>
                                {workingDays}
                                <h5> | </h5>
                                <h5>Paid Leaves</h5>
                                {employee.paid_leaves}
                            </div>
                        </div>

                        <br></br>
                        <h3>Salary & Allowance:</h3>
                        <table className='custom-table'>

                            <thead>
                                <tr>
                                    <td>Field</td>
                                    <td>Details</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Convey Allowance</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={conveyAllowance}
                                            onChange={(e) => setConveyAllowance(e.target.value)}
                                            placeholder={`Enter ${conveyPercentage ? 'Percentage' : 'Amount'}`}
                                        />
                                        <button onClick={toggleConveyMode}>
                                            {conveyPercentage ? '%' : 'Rs.'}
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>House Rent Allowance</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={houseAllowance}
                                            onChange={(e) => setHouseAllowance(e.target.value)}
                                            placeholder={`Enter ${housePercentage ? 'Percentage' : 'Amount'}`}
                                        />
                                        <button onClick={toggleHouseRentMode}>
                                            {housePercentage ? '%' : 'Rs.'}
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gross Pay (Rs.)</td>
                                    <td>{grossSalary.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        

                        <br></br>
                        <h3>Deduction:</h3>

                        <table className='custom-table'>
                            <thead>
                                <tr>
                                    <td>Field</td>
                                    <td>Details</td>
                                </tr>

                            </thead>
                            <tbody>

                                <tr>
                                    <td>Unpaid Leaves ({employee.unpaid_leaves})</td>
                                    <td>-{leaveDeduction.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Income Tax (Monthly)</td>
                                    <td>-{monthlyIncomeTax.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>Provident Fund</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={providentFund}
                                            onChange={(e) => setProvidentFund(e.target.value)}
                                            placeholder={`Enter ${providentPercentage ? 'Percentage' : 'Amount'}`}
                                        />
                                        <button onClick={toggleProvidentMode}>
                                            {providentPercentage ? '%' : 'Rs.'}
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Net Salary (Rs.)</td>
                                    <td> {netSalary.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                </div>
            </div>
        </div>
    );
}

export default Salary;

require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");
const nodemailer = require('nodemailer');





const app = express();
app.use(express.json()); 

app.use(cors());


const db = mysql.createConnection({
    host: "database-1.cz6emccgik9t.us-east-1.rds.amazonaws.com",
    user: 'admin',
    password: 'f2021266024',
    database: 'HrSystem'
});


// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

////////////////////////////////////////////////////////
// Initialzing nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nexgenhr21@gmail.com',      // replace with your email
    pass: 'vbkjqatovowklpfs',   // replace with your app password or email password
  },
});
// Email sender function
async function sendSalarySlipEmail(toEmail, employeeName, salaryData) {
  const {
    em_salary,
    paid_leaves,
    unpaid_leaves,
    gross_salary,
    net_salary,
    leave_deduction,
    monthly_tax,
    provident_fund,
  } = salaryData;

  const mailOptions = {
    from: '"HR System" <nexgenhr21@gmail.com>',
    to: toEmail,
    subject: `Salary Slip for ${employeeName}`,
    html: `
      <h3>Salary Slip</h3>
      <p>Hello ${employeeName},</p>
      <p>Here is your salary slip for this month:</p>
      <ul>
        <li><b>Base Salary:</b> $${em_salary}</li>
        <li><b>Gross Salary:</b> $${gross_salary}</li>
        <li><b>Provident Fund:</b> $${provident_fund}</li>
        <li><b>Leave Deduction:</b> $${leave_deduction}</li>
        <li><b>Monthly Tax:</b> $${monthly_tax}</li>
        <li><b>Net Salary:</b> $${net_salary}</li>
        <li><b>Paid Leaves:</b> ${paid_leaves}</li>
        <li><b>Unpaid Leaves:</b> ${unpaid_leaves}</li>
      </ul>
      <p>Regards,<br/>HR Department</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// Route to send salary slip
app.post("/employee/send-salary-slip/:id", (req, res) => {
  const employeeId = req.params.id;

  const sql = `
    SELECT employee_id, first_name, last_name, em_salary, paid_leaves, unpaid_leaves, em_email
    FROM employee
    WHERE employee_id = ?
  `;

  db.query(sql, [employeeId], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const employee = result[0];

    // Instead of sending only the base salary,
    // we expect the final calculated salary and components to come from the frontend
    const {
      grossSalary,
      netSalary,
      leaveDeduction,
      monthlyIncomeTax,
      providentFund,
    } = req.body; // Make sure these are passed from frontend

    const salaryData = {
      ...employee,
      gross_salary: grossSalary,
      net_salary: netSalary,
      leave_deduction: leaveDeduction,
      monthly_tax: monthlyIncomeTax,
      provident_fund: providentFund,
    };

    try {
      await sendSalarySlipEmail(
        employee.em_email,
        `${employee.first_name} ${employee.last_name}`,
        salaryData
      );
      res.json({ message: "Salary slip sent successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send email.", error: error.message });
    }
  });
});



/////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////

const JWT_SECRET = 'your_jwt_secret_key_here'; 

app.post('/login', (req, res) => {
    const { username, password, role } = req.body;
  
    // Check if all fields are provided
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    // Query the database for the user
    const query = `
      SELECT u.*, e.employee_id 
      FROM users u
      LEFT JOIN employee e ON u.username = e.em_email
      WHERE u.username = ? AND u.role = ?
    `;

    db.query(query, [username, role], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database query error.' });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid username or role.' });
      }
  
      const user = results[0];
  
      // Compare passwords
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid password.' });
      }
  
      // Generate JWT
      const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.json({
        message: 'Login successful.',
        token,
        userId: user.employee_id || null, // could be undefined/null for non-employees
        role: user.role
      });

    });
  });
  


//////////////////////////////////////////////////////////////////////////////////////

app.get('/employee', (req,res) => {
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, data) => {
        if(err) return res.json(err); 
        return res.json(data); 
    })
}); //Display on Admin dashboard

app.get('/employeedash/:id', (req,res) => {
    const sql = "SELECT * FROM employee WHERE employee_id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json(err); 
        return res.json(data);
    })
});// Display on Employee dashboard

app.put('/employeedash/update/:id', (req, res) => {
    const sql = "UPDATE employee set `first_name` = ?, `last_name` = ?, `em_email` = ?, `em_password` = ?, `em_address` = ?, `em_status` = ?, `em_gender` = ?, `em_phone` = ?, `em_birthday` = ?, `em_salary` = ? WHERE employee_id = ?";
    const values = [
        // req.body.firstName,
        // req.body.lastName,
        // req.body.email,
        // req.body.password,
        // req.body.address,
        // req.body.status,
        // req.body.gender,
        // req.body.number,
        // req.body.dateSelected,
        // req.body.salary
        req.body.first_name,
        req.body.last_name,
        req.body.em_email,
        req.body.em_password,
        req.body.em_address,
        req.body.em_status,
        req.body.em_gender,
        req.body.em_phone,
        req.body.em_birthday,
        req.body.em_salary
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.post('/employee/add-employee', (req, res) => {
    console.log("🛠 Received Data:", req.body); // ✅ Debugging the received data

    const sql = `INSERT INTO employee (first_name, last_name, em_email, em_password, em_address, em_status, em_gender, em_phone, em_birthday, em_salary) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.em_email,
        req.body.em_password,
        req.body.em_address,
        req.body.em_status,
        req.body.em_gender,
        req.body.em_phone,
        req.body.em_birthday,
        req.body.em_salary
    ];

    // Corrected query execution
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(" MySQL Error:", err);
            return res.status(500).json({ error: err.message });
        }
        ////////////function to add in users credentials table
        (async () => {
            try {
                const hashedPassword = await bcrypt.hash(req.body.em_password, 10);
                const userInsertQuery = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
                const userValues = [req.body.em_email, hashedPassword, 'Employee'];

                db.query(userInsertQuery, userValues, (userErr, userResult) => {
                    if (userErr) {
                        console.error("User Insert Error:", userErr);
                    } else {
                        console.log("✅ User added to users table");
                    }
                });
            } catch (hashErr) {
                console.error("Password Hash Error:", hashErr);
            }
        })();
        //////////////////
        res.status(201).json({ message: "✅ Employee added successfully!", data });

    
    });
    
});


app.put('/employee/update/:id', (req, res) => {
    const sql = "UPDATE employee set `first_name` = ?, `last_name` = ?, `em_email` = ?, `em_password` = ?, `em_address` = ?, `em_status` = ?, `em_gender` = ?, `em_phone` = ?, `em_birthday` = ?, `em_salary` = ? WHERE employee_id = ?";
    const values = [
        // req.body.firstName,
        // req.body.lastName,
        // req.body.email,
        // req.body.password,
        // req.body.address,
        // req.body.status,
        // req.body.gender,
        // req.body.number,
        // req.body.dateSelected,
        // req.body.salary
        req.body.first_name,
        req.body.last_name,
        req.body.em_email,
        req.body.em_password,
        req.body.em_address,
        req.body.em_status,
        req.body.em_gender,
        req.body.em_phone,
        req.body.em_birthday,
        req.body.em_salary
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
}); 

app.delete('/employee/:id', (req, res) => {
    const sql = "DELETE from employee WHERE employee_id = ?";

    const id = req.params.id;

    db.query(sql, [id], (err,data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.get('/employee/show/:id', (req,res) => {
    const sql = "SELECT * FROM employee WHERE employee_id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json(err); 
        return res.json(data); 
    })
}); //API to get data from database

//employee salary
app.get('/employee/invoice/:id', (req, res) => {
    // Query to get employee's base salary, paid and unpaid leaves
    const sql = `SELECT employee_id, first_name, last_name, em_salary, paid_leaves, unpaid_leaves
                 FROM employee WHERE employee_id = ?`;
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (data.length > 0) {
            return res.json(data[0]); // Send back the first row (since it should only return one employee)
        } else {
            return res.status(404).json({ message: "Employee not found" });
        }
    });
});



//search employee
app.get('/employee/search', (req, res) => {
    const searchTerm = req.query.q;
    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    const sql = "SELECT * FROM employee WHERE first_name LIKE ? OR last_name LIKE ? OR em_email LIKE ? OR employee_id LIKE ?";
    const values = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];

    db.query(sql, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});



////////////////////////////////////////////////////////

// Get all job posts
app.get('/job-posts', (req, res) => {
    db.query('SELECT * FROM job_posts ORDER BY created_at DESC', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  
  // Create a new job post (for admin)
  app.post('/job-posts', (req, res) => {
    const { title, company, location, description } = req.body;
  
    if (!title || !company || !location) {
      return res.status(400).json({ message: 'Title, company, and location are required.' });
    }
  
    const sql = 'INSERT INTO job_posts (title, company, location, description) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, company, location, description], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Job post created successfully' });
    });
  });
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/cvs/");
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

////upload cvs////

const upload = multer({ storage });

// Serve static files
app.use('/uploads/cvs', express.static(path.join(__dirname, 'uploads/cvs')));

// Route to handle job application CV upload
app.post("/apply", upload.single("cv"), (req, res) => {
    const { jobId } = req.body;
    const cvPath = req.file.path;

    // Optional: Store cvPath and jobId in database if needed

    res.status(200).json({ message: "CV uploaded successfully!", jobId, cvPath });
});



////////////////////////////////////////////////////////


app.listen(3001, () => {
    console.log("Listening..");
});
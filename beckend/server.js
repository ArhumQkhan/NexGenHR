require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");


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

/////////////////////////////////////////////////////////

const JWT_SECRET = 'your_jwt_secret_key_here'; 

app.post('/login', (req, res) => {
    const { username, password, role } = req.body;
  
    // Check if all fields are provided
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    // Query the database for the user
    const query = 'SELECT * FROM users WHERE username = ? AND role = ?';
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
  
      res.json({ message: 'Login successful.', token });
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
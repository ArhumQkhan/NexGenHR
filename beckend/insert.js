const mysql = require('mysql2');  
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
    host: "database-1.cz6emccgik9t.us-east-1.rds.amazonaws.com",
    user: 'admin',
    password: 'f2021266024',
    database: 'HrSystem'
});

// Hash the password before inserting it into the database
async function createUser(username, password, role) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password

    // Insert the user into the database
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(query, [username, hashedPassword, role], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return;
      }
      console.log('User inserted successfully:', result);
    });
  } catch (err) {
    console.error('Error hashing password:', err);
  }
}

// Example usage
// createUser('hruser123@gmail.com', 'password123', 'HR');
//createUser('employee@gmail.com', 'password12345', 'Employee');
createUser('hr@gmail.com', 'password', 'HR')
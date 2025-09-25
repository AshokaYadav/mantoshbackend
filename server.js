const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv=require('dotenv')

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON body

// ✅ MySQL Connection (XAMPP ke sath)
dotenv.config(); // ✅ env file load karega

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Test connection
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed: ', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
   const createTableQuery = `
    CREATE TABLE IF NOT EXISTS mantosh (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      age INT
    )
  `;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("❌ Error creating table:", err);
    } else {
      console.log("✅ Members table ready!");
    }
  });
});



app.get('/',(req,resp)=>{
  resp.json("ok")
})
// 🔹 Get users from DB
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM mantosh'; // Apna table name yaha likhna
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Query error:', err);
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    console.log('📢 All Users from DB:', results); // 👈 Console pe dikhega
    res.json(results);
  });
});

// 🔹 Add new user (POST API)
app.post('/users', (req, res) => {
  const { name, age } = req.body;
  const query = 'INSERT INTO mantosh (name, age) VALUES (?, ?)'; // ✅ table name correct karo
  db.query(query, [name, age], (err, result) => {
    if (err) {
      console.error('❌ Insert error:', err);
      res.status(500).json({ error: 'Failed to add user' });
      return;
    }
    console.log('✅ New User Added:', { id: result.insertId, name, age }); // 👈 Console pe dikhega
    res.json({ id: result.insertId, name, age });
  });
});

// Use dynamic port for Render / Local
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

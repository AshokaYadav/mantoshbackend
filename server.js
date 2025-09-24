const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON body

// ✅ MySQL Connection (XAMPP ke sath)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // XAMPP ka default user
  password: '',       // Default me blank hota hai
  database: 'mantosh_backend', // Apna DB name likhna
});

// Test connection
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed: ', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

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

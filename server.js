const express = require('express');
const cors = require('cors');

const app = express();

// 🔹 Allow all origins
app.use(cors());

app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'lice', age: 25 },
    { id: 2, name: 'Bb', age: 30 },
    { id: 3, name: 'Charlie', age: 22 },
  ];
  res.json(users);
});

// Use dynamic port for Render
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

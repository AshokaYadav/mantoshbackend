const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    const users = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 22 },
    ];

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Node.js!');
  }
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

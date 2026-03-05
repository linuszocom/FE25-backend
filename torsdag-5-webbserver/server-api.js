import http from 'http';

const PORT = 3001;
const server = http.createServer((req, res) => {

  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ meddelande: 'Hello from the server!' }));
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body);
      console.log('Mottagen data:', data);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ mottaget: true }));
    });
  }

});

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));

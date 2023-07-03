import http from 'http'
import { users } from './data/users';

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/api" && req.method === "GET") {
   
    res.writeHead(200, { "Content-Type": "application/json" });
    
    res.write("Hi there, This is a Vanilla Node.js API");
    
    res.end();
  } else if (req.url === "/api/users" && req.method === "GET") {
    res.write(JSON.stringify(users));
    res.end();
  }
  
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(port, () => {
  console.log(`Server running at port 3000`);
});

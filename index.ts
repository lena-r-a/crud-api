import http from 'http'
import { users } from './data/users';
import { Controller } from './controller/controller';
import { getReqData } from './utils/utils';

interface iUser {
  id: string,
  username: string,
  age: number,
  hobbies: string[],
}

const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  if (req.url === "/api" && req.method === "GET") {

    res.writeHead(200, { "Content-Type": "application/json" });

    res.write("Hi there, This is a Vanilla Node.js API");

    res.end();
  } else if (req.url === "/api/users" && req.method === "GET") {
    const allusers = await new Controller().getUsers();
    res.write(JSON.stringify(allusers));
    res.end();

  } else if (req.url?.match(/\/api\/users\/([0-9A-za-z]+)/) && req.method === "GET") {
    try {
      const id = req.url.split("/")[3];
      const thisuser = await new Controller().getUser(id);
      res.write(JSON.stringify(thisuser));
      res.end();
    } catch (error) {
      const id = req.url.split("/")[3];
      const status = regexExp.test(id) ? 404 : 400;
      res.writeHead(status, { "Content-Type": "application/json" });
      if (status == 400) {
        res.end("Invalid id")
      } else res.end(error);
    }

  } else if (req.url === "/api/users" && req.method === "POST") {
    try {
      let userData = await getReqData(req);
      console.log(userData);
      let newUser = await new Controller().createUser(JSON.parse(userData));
      res.writeHead(200, { "Content-Type": "application/json" });
      users.push(newUser as iUser);
      res.end(JSON.stringify(newUser));

    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(error);
    }
  } else if (req.url?.match(/\/api\/users\/([0-9A-za-z]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    try {
      let userData = await getReqData(req);
      let updatedUser = await new Controller().updateUser(id, JSON.parse(userData));
      res.writeHead(200, { "Content-Type": "application/json" });
      users.findIndex(user => user.id == id);
      let index = users.findIndex(user => user.id == id)
      Object.assign(users[index],updatedUser as iUser);
      res.end(JSON.stringify(users.find((user) => user.id == id)));

    } catch (error) {
      const status = regexExp.test(id) ? 404 : 400;
      res.writeHead(status, { "Content-Type": "application/json" });
      if (status == 400) {
        res.end("Invalid id")
      } else res.end(error);
    }
  } else if(req.url?.match(/\/api\/users\/([0-9A-za-z]+)/) && req.method === "DELETE") {

    const id = req.url.split("/")[3];
    try {
      let massege = await new Controller().deleteUser(id);
      res.writeHead(204, { "Content-Type": "plain/text" });
      users.findIndex(user => user.id == id);
      let index = users.findIndex(user => user.id == id)
      let newUsers = users.splice(index, 1);
      console.log(massege);
      res.end("deleted");

    } catch (error) {
      const status = regexExp.test(id) ? 404 : 400;
      res.writeHead(status, { "Content-Type": "application/json" });
      if (status == 400) {
        res.end("Invalid id")
      } else res.end(error);
    }

  }

  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(port, () => {
  console.log(`Server running at port 3000`);
});

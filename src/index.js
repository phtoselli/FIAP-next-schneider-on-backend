import http from "node:http";
import register from "./services/register.service.js";

const PORT = 3001;

const routes = {
    "/": {
    "GET": (_req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ "message": "OK" }));
      res.end();
    }
  },
  "/register": {
    "POST": async (req, res) => {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk
      });

      req.on('end', async () => {
        try {
          const requestData = JSON.parse(body);
          const response = await register.createNewUser(requestData);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ "message": `User created! id: ${response}` }));
          res.end();
        } catch (error) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ "message": error.message }));
          res.end();
        }
      });
    }
  },
  default: (_req, res) => {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ "message": "This route doesn't exists." }));
    res.end();
  }
};

const handler = (req, res) => {
  const { url, method } = req;
  console.log("url:", url);
  console.log("method:", method);

  if (!routes[url] || !routes[url][method]) return routes.default(req, res);

  return routes[url][method](req, res);
};

const server = http
  .createServer(handler)
  .listen(PORT, () => console.log(`🟢 Node http server is running on ${PORT}`));

export default server;

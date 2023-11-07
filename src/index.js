import http from "node:http";

const PORT = 3001;

const routes = {
    "/": {
    "GET": (_req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ "message": "OK" }));
      res.end();
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


// "/register": {
//   "POST": (_req, res) => {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(JSON.stringify({ "message": "OK" }));
//     res.end();
//   }
// },
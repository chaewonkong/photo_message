// Static Express server
const express = require("express");
const http = require("http");

const app = express();
const server = http.Server(app);

// Server "app" directory
app.use(express.static(`${__dirname}/../app`));

app.use("/modules", express.static(`${__dirname}/../node_modules`));

server.listen(8000, () =>
  console.log("Photo Message running on localhost:8000")
);

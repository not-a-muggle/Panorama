const http = require('http');

const app = require('./app.js');

const port = process.env.PORT || 4000;

const server = http.createServer(app);
console.log("User service started on port 4000");
server.listen(port);
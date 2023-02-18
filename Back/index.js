const http = require("http");
const app = require("./app");
require('dotenv').config();
const port = 3000

app.listen(port,() => console.log("listening on port" + port))

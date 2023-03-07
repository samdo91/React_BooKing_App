const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const PORT = 5173 || process.nev.PORT;

server.listen(PORT, () => {
  console.log(`${PORT} 연결 완료`);
});

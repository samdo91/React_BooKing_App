const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const localhost = "127.0.0.1";
const PORT = 400 || process.nev.PORT;

app.use(
  "/api",
  createProxyMiddleware({
    target: `http://localhost:5173`,
    changeOrigin: true,
  })
);
app.listen(PORT, localhost, () => {
  console.log(`${localhost} ${PORT} 연결 완료`);
});

// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar

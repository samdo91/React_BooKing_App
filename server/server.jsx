const express = require("express");
const app = express();
http = require("http");
const cors = require("cors");
app.use(cors());

app.get("/server", function (req, res) {
  res.send("안들어가지네");
});

app.get("/api/countryCode", (req, res) => {
  // res.json([
  //   {
  //     country: "Usa",
  //     countryCode: +1,
  //     phoneNumber: [0000000, 0000001, 0000002],
  //   },
  // ]);
  res.json([
    {
      country: "USA",
      countryCode: +1,
      phoneNumber: [0000000, 0000001, 0000002],
    },
    {
      country: "Malaysia",
      countryCode: +60,
      phoneNumber: [0000000, 0000001, 0000002],
    },
    {
      country: "Korea",
      countryCode: +82,
      phoneNumber: [00000, 1231232, 345345345],
    },
    {
      country: "Paraguay",
      countryCode: +595,
      phoneNumber: [00000, 123123, 345345345],
    },
  ]);
});

const PORT = 4000 || process.nev.PORT;
const localhost = "127.0.0.1";
http.createServer(app).listen(PORT, localhost, () => {
  console.log(`${PORT} 연결 완료`);
});

const express = require("express");
const app = express();
http = require("http");
var cors = require("cors");
const localhost = "127.0.0.1";
app.use(
  cors({
    optionSuccessStatus: 200,
    origin: `http://localhost:5173`,
    credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
); // Use this after the variable declaration

app.use(express.json());
//mongoDB를 사용해보자.
const { MongoClient, ServerApiVersion } = require("mongodb");

// mogoosef로 업그레이드
const mongoose = require("mongoose");

// 거기에 dotenv를 뿌리면?
require("dotenv").config();

// rgister와 login에 쓰이는 모델
const User = require(`./models/user.jsx`);
const Acommodaton = require(`./models/acommodaton.jsx`);
// bcrypt 란 암호 복호화이다.

const bcrypt = require("bcrypt");
const userPasswordBcrypt = bcrypt.genSaltSync(10);

// jsonwebtoken을 사용해보자. 토큰 만들기
const jwt = require("jsonwebtoken");
const jwtSecret = "1q2w3e4r!";

//cookieParser? 쿠키 데이터를 JavaScript 객체로 변환하는 기능을 제공한다.
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//multer를 쓰자. 내 파일 업로드
const multer = require("multer");
// "fs" 모듈은 파일 시스템 관련 작업, 즉 파일 생성, 삭제, 읽기, 쓰기 등을 수행할 수 있는 메서드를 제공함
// 예를 들어, "fs" 모듈을 사용하여 파일을 읽거나 쓸 수 있으며, 파일을 복사하거나 이동할 수있다!
const fs = require("fs");

// Node Image Downloader Node.js 환경에서 이미지를 다운로드하는 라이브러리
const download = require("image-downloader");
app.use("/uploads", express.static(__dirname + "/uploads"));

// 내 mongoDB uri인겁니다 api에 연결해줘요.
const { DB_URL, DB_URL_TEST } = process.env;

// mongoose를 사용해보자.
mongoose.connect(DB_URL_TEST);

// 숙소 저장
app.post(`/acommodatonSeve`, async (req, res) => {
  console.log(req.body);
  const { token } = req.cookies;
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    type,
    hostName,
    city,
    price,
    country,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, useData) => {
    if (err) throw err;

    try {
      //  Acommodaton.create를 사용하여 도큐먼트를 만들면 DB에 저장된다.
      const acommodatonDoc = await Acommodaton.create({
        owner: useData.id,
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        type,
        hostName,
        city,
        price,
        country,
      });

      res.json(acommodatonDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  });
});

// 회원가입
app.post(`/register`, async (req, res) => {
  console.log(req.body);
  const { name, email, password, countryCode, phoneNumber } = req.body;

  try {
    // User.create를 사용하여 도큐먼트를 만들면 DB에 저장된다.
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, userPasswordBcrypt),
      countryCode,
      phoneNumber,
    });

    console.log(userDoc);
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

const findPhoneNumber = (userDoc, countryCode, password) => {
  const userId = userDoc.filter((item) => {
    return item.countryCode === countryCode;
  });

  // bcrypt.compareSync 통해 복호화된 페스워드와 loginpage에서 포스트한 페스워드와 비교한다. 결과는 boolean으로 재출된다.
  const passOK = bcrypt.compareSync(password, userId[0].password);

  if (passOK) {
    return userId[0];
  } else {
    alert("비밀번호가 틀렸어");
  }
};

app.post(`/login`, async (req, res) => {
  // post로 변경
  const { password, countryCode, phoneNumber } = req.body;
  // find로 맞는 폰 넘버를 가진 쿼리? 도큐먼트?를 찾아온다.
  const userDoc = await User.find({ phoneNumber });
  // 최종적으로 걸러낸 진짜 유저다.
  const users = findPhoneNumber(userDoc, countryCode, password);

  //토큰의 수명
  const options = {
    expiresIn: 30, // 30 seconds
  };
  if (users) {
    jwt.sign(
      { email: users.email, id: users._id, name: users.name },

      jwtSecret,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;

        res
          .cookie(`token`, token, { sameSite: "none", secure: true })
          .json(users);
      }
    );
  } else {
    res.status(422).json("pass not ok");
  }
});

app.post("/server", function (req, res) {
  console.log(2);
  res.json("안들어가지네");
});

app.get("/api/countryCode", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
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
      user: [
        { name: "대성", phoneNumber: 1231232, password: "eotjd" },
        { name: "상진", phoneNumber: 123123222, password: 1231232 },
      ],
    },
    {
      country: "Paraguay",
      countryCode: +595,

      phoneNumber: [00000, 123123, 345345345],
    },
  ]);
});

app.post(`/address`, (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.json([
    {
      country: "South Korea",
      city: "Yeosu",
      type: ["Ryokan", "private", "Luxe"],
      price: 207343,
      hostName: "Kim Taeyeon",
      picture:
        "https://a0.muscache.com/im/pictures/ee920ff9-7e31-43db-bcb5-54da5e2623fa.jpg?im_w=720",
    },
    {
      country: "Canada",
      city: "Digby",
      type: ["sea", "boat"],
      price: 847797,
      hostName: "Park Jisung",
      picture:
        "https://a0.muscache.com/im/pictures/e95abf4c-6463-41fd-a06e-08c449473d5c.jpg?im_w=720",
    },
    {
      country: "Brazil",
      city: "São Paulo",
      type: ["city", "design", "mansion"],
      price: 75759,
      hostName: "Lee Jinho",
      picture:
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-607458038229062130/original/1e20dfc7-ea12-44b2-a837-2bdcd8502133.jpeg?im_w=720",
    },
    {
      country: "India",
      city: "Goa",
      type: ["beach", "mansion"],
      price: 828673,
      hostName: "Park Jihyo",
      picture:
        "https://a0.muscache.com/im/pictures/miso/Hosting-50876204/original/9df41105-3c80-40c3-829a-d7fae852c15b.jpeg?im_w=720",
    },
    {
      country: "Spain",
      city: "Barcelona",
      type: ["popularity", "city"],
      price: 242848,
      hostName: "Kim Jongin",
      picture:
        "https://a0.muscache.com/im/pictures/5b6242a9-8832-432b-ac79-38de2a3d0b0d.jpg?im_w=720",
    },
    {
      country: "Japan",
      city: "Tokyo",
      type: ["design", "city"],
      price: 819765,
      hostName: "Kang Seulgi",
      picture:
        "https://a0.muscache.com/im/pictures/f18bc1db-e914-4931-aa9f-8f3a03bc22c2.jpg?im_w=720",
    },
    {
      country: "Italy",
      city: "Rome",
      type: ["mansion", "design"],
      price: 542422,
      hostName: "Jung Jaehyun",
      picture:
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-50079213/original/dd5cbdce-5770-4326-be8c-32693885d9c0.jpeg?im_w=720",
    },
    {
      country: "Thailand",
      city: "Chiang Mai",
      type: ["Luxe", "Design"],
      price: 75000,
      hostName: "Nong",
      picture:
        "https://a0.muscache.com/im/pictures/fe92456e-6d0b-4758-a0fa-bb80bf4f4ac1.jpg?im_w=720",
    },
    {
      country: "Japan",
      city: "Hakone",
      type: ["Ryokan", "Sea"],
      price: 55000,
      hostName: "Sakura",
      picture:
        "https://a0.muscache.com/im/pictures/95b6a758-2acc-4861-ba67-eca78cb2f6c7.jpg?im_w=720",
    },
    {
      country: "Italy",
      city: "Venice",
      type: ["City", "Mansion", "Luxe"],
      price: 95000,
      hostName: "Giovanni",
      picture:
        "https://a0.muscache.com/im/pictures/miso/Hosting-51954152/original/9649a1f2-384d-4a12-9f6c-690171e8bb7d.jpeg?im_w=720",
    },
    {
      country: "Mexico",
      city: "Cancun",
      type: ["Beach", "Luxe"],
      price: 125000,
      hostName: "Alejandro",
      picture:
        "https://a0.muscache.com/im/pictures/miso/Hosting-646814822102982021/original/a040ce6f-245b-42af-95db-7a5a7c59a272.jpeg?im_w=720",
    },
    {
      country: "France",
      city: "Paris",
      type: ["City", "Design"],
      price: 80000,
      hostName: "Marie",
      picture:
        "https://a0.muscache.com/im/pictures/miso/Hosting-547414591513302121/original/e03b9625-1915-48eb-afad-bf3b2fe21459.jpeg?im_w=720",
    },
    {
      country: "Canada",
      city: "Vancouver",
      type: ["Sea", "Luxe"],
      price: 110000,
      hostName: "Emily",
      picture:
        "https://a0.muscache.com/im/pictures/8340b03d-6405-4a61-ac8a-fc9d9d445f0f.jpg?im_w=720",
    },
    {
      country: "Brazil",
      city: "Rio de Janeiro",
      type: ["Beach", "Luxe", "Design"],
      price: 95000,
      hostName: "Lucas",
      picture:
        "https://a0.muscache.com/im/pictures/9bd8b267-03ae-4ab8-ae7a-c4dc039c9af0.jpg?im_w=720",
    },
    {
      country: "Germany",
      city: "Berlin",
      type: ["city", "design"],
      price: 75000,
      hostName: "Max",
      picture:
        "https://a0.muscache.com/im/pictures/8fc60ec1-ab3c-4c1a-afd7-bfea97a5babc.jpg?im_w=720",
    },
    {
      country: "Mexico",
      city: "Cabo San Lucas",
      type: ["beach", "private", "koreaHome"],
      price: 98000,
      hostName: "Maria",
      picture:
        "https://a0.muscache.com/im/pictures/miso/Hosting-53655482/original/61f23390-01ad-4daf-b20f-4c86f3e05a58.jpeg?im_w=720",
    },
    {
      country: "Thailand",
      city: "Phuket",
      type: ["beach", "private", "luxury"],
      price: 125000,
      hostName: "Somchai",
      picture:
        "https://a0.muscache.com/im/pictures/miso/Hosting-44030609/original/abe0ffb1-8c83-4ce3-ad41-8f67e0f4eeef.jpeg?im_w=720",
    },
    {
      country: "Australia",
      city: "Sydney",
      type: ["city", "mansion", "luxury"],
      price: 275000,
      hostName: "Jack",
      picture:
        "https://a0.muscache.com/im/pictures/miso/Hosting-634978112134674011/original/b7b963d6-f76d-4f40-88fd-444df9389e22.jpeg?im_w=720",
    },
    {
      country: "India",
      city: "Jaipur",
      type: ["private", "mansion", "koreaHome"],
      price: 48000,
      hostName: "Raj",
      picture:
        "https://a0.muscache.com/im/pictures/bc01e788-59d2-4e39-8d60-0c0c14689763.jpg?im_w=720",
    },
    {
      country: "Brazil",
      city: "Rio de Janeiro",
      type: ["beach", "luxury"],
      price: 185000,
      hostName: "Pedro",
      picture:
        "https://a0.muscache.com/im/pictures/fb0e0f97-e9a9-45c5-96d7-70c76f8b1ab2.jpg?im_w=720",
    },
    {
      country: "Spain",
      city: "Barcelona",
      type: ["city", "design"],
      price: 78000,
      hostName: "Marta",
      picture:
        "https://a0.muscache.com/im/pictures/7a05132e-7be7-42a2-a8e7-55bda5ec9c5e.jpg?im_w=720",
    },
    {
      country: "Mexico",
      city: "Cancun",
      type: ["beach", "luxury", "resort"],
      price: 75000,
      hostName: "Alejandro",
      picture:
        "https://a0.muscache.com/im/pictures/6c180eaa-33f6-4293-8c67-7c85d39467de.jpg?im_w=720",
    },
    {
      country: "Japan",
      city: "Tokyo",
      type: ["city", "modern", "apartment"],
      price: 55000,
      hostName: "Yuki",
      picture:
        "https://a0.muscache.com/im/pictures/77fde9a5-41f4-4d33-aa4c-7f4d27e60a2d.jpg?im_w=720",
    },
    {
      country: "Spain",
      city: "Barcelona",
      type: ["city", "apartment", "koreaHome"],
      price: 45000,
      hostName: "Javier",
      picture:
        "https://a0.muscache.com/im/pictures/03a098a9-9c75-4d4b-b83e-c4af24e25c61.jpg?im_w=720",
    },
    {
      country: "Australia",
      city: "Sydney",
      type: ["beach", "luxury", "resort"],
      price: 85000,
      hostName: "Oliver",
      picture:
        "https://a0.muscache.com/im/pictures/miso/Hosting-50238163/original/e9c0f59f-2c61-4f07-b14c-8cc791ab7ee6.jpeg?im_w=720",
    },
    {
      country: "Italy",
      city: "Rome",
      type: ["city", "historic", "apartment"],
      price: 50000,
      hostName: "Lorenzo",
      picture:
        "https://a0.muscache.com/im/pictures/e9860821-4e4e-4a9b-9af6-23d6fda5e5f5.jpg?im_w=720",
    },
    {
      country: "South Africa",
      city: "Cape Town",
      type: ["beach", "luxury", "surprise"],
      price: 82000,
      hostName: "Marius",
      picture:
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45696508/original/b0225b5d-9c62-41e8-bb48-880fa9060c46.jpeg?im_w=720",
    },
    {
      country: "Italy",
      city: "Rome",
      type: ["mansion", "koreaHome"],
      price: 40000,
      hostName: "Francesca",
      picture:
        "https://a0.muscache.com/im/pictures/4d6afab5-5628-4969-9d9d-1f826a1bfe33.jpg?im_w=720",
    },
    {
      country: "Brazil",
      city: "Rio de Janeiro",
      type: ["beach", "private", "design"],
      price: 55000,
      hostName: "Pedro",
      picture:
        "https://a0.muscache.com/im/pictures/752bacef-ecbb-47e8-9fcf-42b1d09b1c8f.jpg?im_w=720",
    },
    {
      country: "Thailand",
      city: "Phuket",
      type: ["beach", "luxury"],
      price: 95000,
      hostName: "Somchai",
      picture:
        "https://a0.muscache.com/im/pictures/1ff51b31-4d54-4cf4-b6e9-6d196e97c16f.jpg?im_w=720",
    },
    {
      country: "Australia",
      city: "Sydney",
      type: ["cliff", "luxury"],
      price: 110000,
      hostName: "Ava",
      picture:
        "https://a0.muscache.com/im/pictures/5fb506fd-2b9a-4c5e-90a4-fa4c0a72758e.jpg?im_w=720",
    },
    {
      country: "Mexico",
      city: "Puerto Vallarta",
      type: ["beach", "private", "design"],
      price: 38000,
      hostName: "Juan",
      picture:
        "https://a0.muscache.com/im/pictures/863bc347-ccf9-41f2-9aa3-c3f738035dfa.jpg?im_w=720",
    },
    {
      country: "Iceland",
      city: "Reykjavik",
      type: ["countryside"],
      price: 22000,
      hostName: "Sigrun",
      picture:
        "https://a0.muscache.com/im/pictures/e6ad23c6-28b6-4ee6-9e6d-05d84ed7f714.jpg?im_w=720",
    },
    {
      country: "United States",
      city: "Los Angeles",
      type: ["design", "surprise"],
      price: 64000,
      hostName: "Jackson",
      picture:
        "https://a0.muscache.com/im/pictures/eeae1e89-f01e-44b6-890d-98c7cc8a5209.jpg?im_w=720",
    },
    {
      country: "South Africa",
      city: "Cape Town",
      type: ["beach", "luxury"],
      price: 82000,
      hostName: "Marius",
      picture:
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45696508/original/b0225b5d-9c62-41e8-bb48-880fa9060c46.jpeg?im_w=720",
    },
    {
      country: "Italy",
      city: "Rome",
      type: ["mansion", "surprise"],
      price: 40000,
      hostName: "Francesca",
      picture:
        "https://a0.muscache.com/im/pictures/4d6afab5-5628-4969-9d9d-1f826a1bfe33.jpg?im_w=720",
    },
    {
      country: "Brazil",
      city: "Rio de Janeiro",
      type: ["beach", "private", "design"],
      price: 55000,
      hostName: "Pedro",
      picture:
        "https://a0.muscache.com/im/pictures/752bacef-ecbb-47e8-9fcf-42b1d09b1c8f.jpg?im_w=720",
    },
    {
      country: "Thailand",
      city: "Phuket",
      type: ["beach", "luxury"],
      price: 95000,
      hostName: "Somchai",
      picture:
        "https://a0.muscache.com/im/pictures/1ff51b31-4d54-4cf4-b6e9-6d196e97c16f.jpg?im_w=720",
    },
    {
      country: "Australia",
      city: "Sydney",
      type: ["cliff", "luxury", "surprise"],
      price: 110000,
      hostName: "Ava",
      picture:
        "https://a0.muscache.com/im/pictures/5fb506fd-2b9a-4c5e-90a4-fa4c0a72758e.jpg?im_w=720",
    },
    {
      country: "Mexico",
      city: "Puerto Vallarta",
      type: ["beach", "private", "design"],
      price: 38000,
      hostName: "Juan",
      picture:
        "https://a0.muscache.com/im/pictures/863bc347-ccf9-41f2-9aa3-c3f738035dfa.jpg?im_w=720",
    },
    {
      country: "Iceland",
      city: "Reykjavik",
      type: ["countryside"],
      price: 22000,
      hostName: "Sigrun",
      picture:
        "https://a0.muscache.com/im/pictures/e6ad23c6-28b6-4ee6-9e6d-05d84ed7f714.jpg?im_w=720",
    },
    {
      country: "United States",
      city: "Los Angeles",
      type: ["design"],
      price: 64000,
      hostName: "Jackson",
      picture:
        "https://a0.muscache.com/im/pictures/eeae1e89-f01e-44b6-890d-98c7cc8a5209.jpg?im_w=720",
    },
    {
      country: "Canada",
      city: "Digby",
      type: ["sea", "private"],
      price: 54321,
      hostName: "Samantha",
      picture:
        "https://a0.muscache.com/im/pictures/e95abf4c-6463-41fd-a06e-08c449473d5c.jpg?im_w=720",
    },
    {
      country: "Japan",
      city: "Tokyo",
      type: ["Luxe", "design", "city"],
      price: 78900,
      hostName: "Takeshi",
      picture:
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-50079213/original/dd5cbdce-5770-4326-be8c-32693885d9c0.jpeg?im_w=720",
    },
    {
      country: "Mexico",
      city: "Cancun",
      type: ["sea"],
      price: 12000,
      hostName: "Juan",
      picture:
        "https://a0.muscache.com/im/pictures/b78bafca-b0d7-484a-83a7-937a83fa3595.jpg?im_w=720",
    },
    {
      country: "Australia",
      city: "Sydney",
      type: ["mansion", "city"],
      price: 450000,
      hostName: "Olivia",
      picture:
        "https://a0.muscache.com/im/pictures/8b29bbe1-fe0a-4a32-9dba-1af15dbde880.jpg?im_w=720",
    },
    {
      country: "South Africa",
      city: "Cape Town",
      type: ["park", "cliff", "private"],
      price: 28000,
      hostName: "Nelson",
      picture:
        "https://a0.muscache.com/im/pictures/7cc3c855-f90e-4d0f-9b13-3b5c2a3c4bad.jpg?im_w=720",
    },
    {
      country: "Spain",
      city: "Barcelona",
      type: ["design", "city"],
      price: 80000,
      hostName: "Maria",
      picture:
        "https://a0.muscache.com/im/pictures/8a3d3aa3-d1c2-4a97-8b07-1db76f7a20e9.jpg?im_w=720",
    },
    {
      country: "Japan",
      city: "Kyoto",
      type: ["Ryokan", "traditional"],
      price: 40000,
      hostName: "Takashi",
      picture:
        "https://a0.muscache.com/im/pictures/1a5b5c02-5f5a-441e-b7f5-294a9dd7a054.jpg?im_w=720",
    },
    {
      country: "Italy",
      city: "Florence",
      type: ["mansion", "Luxe"],
      price: 120000,
      hostName: "Giuseppe",
      picture:
        "https://a0.muscache.com/im/pictures/06af40cf-8d1a-4477-95e5-047c8a2833e3.jpg?im_w=720",
    },
    {
      country: "Thailand",
      city: "Phuket",
      type: ["beach", "cliff", "Luxe"],
      price: 150000,
      hostName: "Sirinapa",
      picture:
        "https://a0.muscache.com/im/pictures/554ca26d-862d-4b09-9f38-43a8534cb4b2.jpg?im_w=720",
    },
    {
      country: "Australia",
      city: "Sydney",
      type: ["city", "Luxe"],
      price: 90000,
      hostName: "Jack",
      picture:
        "https://a0.muscache.com/im/pictures/47595857-012f-4a8f-a9da-c9d15e6722e2.jpg?im_w=720",
    },
    {
      country: "Korea",
      city: "Busan",
      type: ["sea", "city", "mansion"],
      price: 150000,
      hostName: "Soomin",
      picture:
        "https://a0.muscache.com/im/pictures/miso/Hosting-58215251/original/8d191e0e-30c7-46e8-8f71-2f12cc9d0680.jpeg?im_w=720",
    },
    {
      country: "Korea",
      city: "Jeju",
      type: ["beach", "private"],
      price: 90000,
      hostName: "Jaejoong",
      picture:
        "https://a0.muscache.com/im/pictures/35a60ee7-58d3-47f9-97c8-39b9e7c0d464.jpg?im_w=720",
    },
    {
      country: "Korea",
      city: "Seoul",
      type: ["city", "popularity", "design"],
      price: 50000,
      hostName: "Jihyun",
      picture:
        "https://a0.muscache.com/im/pictures/miso/Hosting-55300822/original/f147374e-0e98-4a31-9a06-28d04cc84014.jpeg?im_w=720",
    },
    {
      country: "Korea",
      city: "Jeonju",
      type: ["traditional", "park"],
      price: 80000,
      hostName: "Jinsoo",
      picture:
        "https://a0.muscache.com/im/pictures/miso/Hosting-52963387/original/1e1c5b5d-2c37-4060-b0f7-888a1d0a7aeb.jpeg?im_w=720",
    },
    {
      country: "Korea",
      city: "Daegu",
      type: ["mansion", "city"],
      price: 200000,
      hostName: "Sungmin",
      picture:
        "https://a0.muscache.com/im/pictures/2c06e7e1-3606-4611-a8af-bf11c0dab19d.jpg?im_w=720",
    },
  ]);
});

//토큰의 유무를 검사하는 함수
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return true;
  } catch (err) {
    return false;
  }
}

app.post(`/profile`, (req, res) => {
  const { token } = req.cookies;
  const tokens = verifyToken(token);

  if (tokens) {
    // Token(JWT)을 검증하는 함수 verify
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const cookies = await User.findById(userData.id);

      res.json(cookies);
    });
    token;
  } else {
    res.json(false);
  }
});

app.post(`/logout`, (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  const { token } = req.cookies;
  const tokens = verifyToken(token);
  if (tokens) {
    jwt.sign({}, jwtSecret, { expiresIn: "1s" }, (err, token) => {
      if (err) throw err;

      res
        .cookie(`token`, token, { sameSite: "none", secure: true })
        .json("Love");
    });
  }
});

app.post("/photoLink", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const newNames = "http://localhost:4000/uploads/photo" + Date.now() + ".jpg";

  try {
    await new Promise((resolve, reject) => {
      download
        .image({
          // 다운 받을 이미지의 url
          url: link,
          // 파일을 저장할 곳과 파일의 이름
          dest: __dirname + `/uploads/` + newName,
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
    console.log(newNames);
    res.json(newNames);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

const photosmulter = multer({ dest: "uploads/" });
app.post(`/photosUploads`, photosmulter.array("photos", 100), (req, res) => {
  const files = req.files;
  const uploadfiles = [];

  try {
    // 다수의 파일을 서버에 저장
    for (let i = 0; i < files.length; i++) {
      const { path, originalname } = files[i];
      const paths = originalname.split(".");
      const ext = paths[paths.length - 1];
      const newPath = path + "." + ext;
      const nowPath = "http://127.0.0.1:4000/" + path + "." + ext;

      fs.renameSync(path, newPath);
      console.log("path", path);
      console.log("ext", ext);
      console.log("newPath", newPath);

      // 파일 저장 경로 검증 .fs사용
      if (!fs.existsSync("uploads/")) {
        fs.mkdirSync("uploads/");
      }

      uploadfiles.push(nowPath);
    }
    console.log(uploadfiles);

    res.json(uploadfiles);
    // 예외처리 완료
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to upload files.");
  }
});

const PORT = 4000 || process.nev.PORT;

app.listen(PORT, localhost, () => {
  console.log(`${localhost} ${PORT} 연결 완료`);
});

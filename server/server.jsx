const express = require("express");
const app = express();
http = require("http");
var cors = require("cors");
const localhost = "127.0.0.1";

app.use(
  cors({
    optionSuccessStatus: 200,
    origin: (req, callback) => {
      const origin = req.headers.origin;
      const allowedOrigins = [
        "http://localhost:5173",
        "https://magenta-cat-723c98.netlify.app",
      ];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
//mongoDB를 사용해보자.
const { MongoClient, ServerApiVersion } = require("mongodb");

// mogoosef로 업그레이드
const mongoose = require("mongoose");

// 거기에 dotenv를 뿌리면?
require("dotenv").config();

// rgister와 login에 쓰이는 모델
const User = require(`./models/user.jsx`);
const Accommodation = require(`./models/Accommodation.jsx`);
const Booking = require(`./models/booking.jsx`);
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

// mongoose를 사용해보자.
const { DB_URL, DB_URL_TEST } = process.env;
mongoose
  .connect(DB_URL_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB에 연결되었습니다.");
    // 여기에서 서버를 시작하거나 다른 작업을 수행할 수 있습니다.
  })
  .catch((error) => {
    console.error("MongoDB 연결 오류:", error);
  });

//
app.post(`/mainAccommodation`, async (req, res) => {
  res.json(await Accommodation.find());
});

// 숙소 저장
app.post(`/accommodationSeve`, async (req, res) => {
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
      // Accommodation.create를 사용하여 도큐먼트를 만들면 DB에 저장된다.
      const accommodationDoc = await Accommodation.create({
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

      res.json(accommodationDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  });
});

// 숙소 다시 저장
app.post(`/accommodationReseve`, async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
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
      //  req로 넘어온 id로 대상이 될 데이터 리스트를 찾아온다.
      const accommodationDoc = await Accommodation.findById(id);

      // 찾아온 데이터와 내 데이터를 비교해서 맞으면 실행
      if (useData.id.toString() === accommodationDoc.owner.toString()) {
      }
      /* set() 메서드는 Mongoose 문서 객체의 메서드.
문서 객체의 속성 값을 변경하고, 변경된 문서 객체를 반환한다
set() 메서드는 이전 문서 객체의 내용을 바꾸지 않고 새로운 객체를 반환하기 때문에,
 반환된 문서 객체를 저장해야한다. */
      const reSaveDcoc = accommodationDoc.set({
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
      console.log(reSaveDcoc);
      //save() 메서드는 Mongoose 모델 객체의 메서드 중 하나 데이터베이스에 저장된 문서의 내용이 모델 객체의 상태와 일치하도록 갱신함
      const reAccommodationDoc = accommodationDoc.save();
      res.json(reAccommodationDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  });
});

//myAccommodation 불러오기
app.post(`/myAccommodation`, (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      console.error(err);
      res.status(401).send("Unauthorized");
      return;
    }
    try {
      const accommodationDoc = await Accommodation.find({ owner: userData.id });
      res.json(accommodationDoc);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  });
});

app.post(`/detailFixAccommodation`, async (req, res) => {
  const { id } = req.body;
  console.log("id", id);
  const { token } = req.cookies;
  // 쿠키가 있나 검사
  try {
    const decoded = jwt.verify(token, jwtSecret);
    //쿠키가 있으면 내 쿠키 안에 들어있는 id로 파인드를 돌려 내 id 같은 Accommodation리스트를 추출한다.
    const accommodationDoc = await Accommodation.find({ _id: id });

    console.log("my", accommodationDoc);
    res.json(accommodationDoc);
  } catch (err) {
    console.error(err);
    res.status(401).send("Unauthorized");
  }
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

  if (userId.length === 0) {
    console.log("유저를 찾을 수 없습니다.");
    return null; // 혹은 적절한 오류 처리를 수행하세요.
  }

  const passOK = bcrypt.compareSync(password, userId[0].password);

  if (passOK) {
    return userId[0];
  } else {
    console.log("비밀번호가 틀렸어");
    return null; // 혹은 적절한 오류 처리를 수행하세요.
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
    expiresIn: "12h", // 12 시간
  };
  if (users) {
    jwt.sign(
      { email: users.email, id: users._id, name: users.name },

      jwtSecret,
      { expiresIn: "1d" },
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

app.post(`/server`, function (req, res) {
  res.json("안들어가지네");
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

// 사진 링크로 저장

app.post(`/photoLink`, async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const newNames = "uploads/photo" + Date.now() + ".jpg";

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
      const nowPath = path + "." + ext;

      fs.renameSync(path, newPath);

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

// 디테일페이지에 파람스로 들어간 id로 데이터를 불러옴
app.post(`/detailPage`, async (req, res) => {
  const { id } = req.body;
  const accommodationDoc = await Accommodation.findById(id);
  res.json(accommodationDoc);
});

// 디테일페이지에 예약을 확정함
app.post(`/booking`, async (req, res) => {
  const {
    place,
    name,
    checkIn,
    checkOut,
    guests,
    numberOfNight,
    phone,
    prices,
  } = req.body;

  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, useData) => {
    const { id } = useData;
    if (err) throw err;
    try {
      const response = await Booking.create({
        place,
        user: id,
        name,
        checkIn,
        checkOut,
        guests,
        numberOfNight,
        phone,
        prices,
      });
      res.json(response);
    } catch (err) {
      // 예외 처리: MongoDB 에러 발생 시
      console.error(err);
      res
        .status(500)
        .json({ message: "서버 에러: 예약 정보를 생성할 수 없습니다." });
    }
  });
});

//bookingPage에 예약 상황에 사용되는 데이터 불러오기
app.post(`/myBooking`, (req, res) => {
  //쿠키가 있는 지 확인
  const { token } = req.cookies;
  // 쿠키 불러오기
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    console.log(userData);
    if (err) {
      console.error(err);
      res.status(401).send("Unauthorized");
      return;
    }
    try {
      /*populate() 메소드는 Mongoose에서 지원하는 메소드 중 하나로, MongoDB의 레퍼런스 필드를 쉽게 가져올 수 있도록 도와줍니다.
예를 들어 위 코드에서 populate('Accommodation')는 Booking 모델에서 place 필드가 다른 컬렉션(예를 들어 Accommodation 모델)의 _id를 참조하고 있다면, 
해당 _id에 대한 실제 컬렉션의 데이터를 Booking 모델에 연결시켜 줍니다. */
      const bookingDoc = await Booking.find({ user: userData.id }).populate(
        "place"
      );

      res.json(bookingDoc);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  });
});
const PORT = process.env.PORT || 4000;

app.listen(PORT, localhost, () => {
  console.log(`${localhost} ${PORT} 연결 완료`);
});

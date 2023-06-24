# 마크다운 확인사항

> 사용자가 보는것은 마크다운이 아닌 마크다운이 렌더링 된 HTML이다. 

1. WYSIWYG 방식이 아닌, 문법을 이용하여 문서의 구조를 표현하는 방식.
2. 문법이 간단하고, 가독성이 좋다.
5. 단점으로는 표준이 없다. 즉, 도구에 따라서 변환 방식이나 생성물이 다르다.
8. 모든 HTML 마크업을 대신하지 못한다.
10. 개행(`\n\n`) 두 번이면 새로운 단락으로 표기된다.(`<br>` 제외)

위의 순서는 `1.2.3.4.5` 순이 아닌 `1.2.5.8.10` 순으로 작성되어있다.


## 3. 어떻게 만들었는가


### -1. 로그인 페이지

> `-(unordered list)` 와 `1.(ordered list)` 는 같이 쓸 수 없다.
 
- 1.  서버 만들기 통신 주고 받기
      서버를 만드는 일은 Express를 이용하였다. 서버 자체에 user의 데이터를 저장하여 사용했다.

    > `-`로 감싸진 unordered list의 indent를 명확하게 유지할것

    > \```로 감싸진 코드블럭은 적힌 대로 보여진다. <br />
    > indent를 신경쓸것
     
    ```jsx
        // 임시 데이터 -이후 DB를 만들어 그쪽에 값을 저장하는 쪽으려 변경하였다.

        /* 콤마, 텍스트 여부 제대로 확인할 것 */
        /* 괄호를 개행해서 코드블럭을 확인하기 쉽도록 할 것 */
        const users = [
            { id: 1, name: "유저1", password: "***" }, 
            { id: 2, name: "유저2", password: "***" },
            { id: 3, name: "유저3", password: "***" } 
        ];

        //유저 정보 반환
        app.get(`/login`, (req, res) => {
            res.json({ok: true, users: users}); 
        });
    ```

    임시로 저장된 데이터를 res.json으로 반환하여 임시 데이터와 내가 입력한 데이터를 비교하여 로그인이 되는지 안되는 지 판단하는 함수를 만든다.
    그를 위해서는 두가지 만들것이 있다. <br>

    1.  로그인이 성공했을 때 성공한 상태를 저장하기.- 전역관리를 통해 해결가능(`Jotai` 사용)
        jotai를 사용한 전역 관리는 사용법이 편리하고 간단하기 때문에 리덕스 대신 사용하고 있다.

        ```jsx
        // 로그인이 되어 있는가?를 확인하고 저장하는 atom
        export const loginStates = atom(false);

        // 유저데이터가 저장된다.
        export const userDataAtom = atom({
          login: false,
          token: false,
          name: "",
          password: "",
          id: "",
        });
        ```

        특히 loginStates atom은 이후 생성된 쿠키를 이용하기 위해 필요한 atom이다.

        매번 페이지가 랜더링 될때마다 loginStates의 상태를 확인하고 false라면 쿠키로 만든 토큰이 존재하는 지 서버에 확인하고 토큰이 있다면 로그인하고 userDataAtom 에 유저 데이터를 저장하게 만들수 있다.

    2. 로그인이 성공한 상태를 유지하기. - cookie를 사용하면 된다.
       `jsonwebtoken`를 이용하여 토큰을 만든다. 이후 만들어진 토큰은 로그아웃 할때까지 사용할 수 있다.

        ```jsx
        app.post(`/login`, async (req, res) => {
          // post로 변경
          const { password, name } = req.body;
          // find로 같은 이름 가진 유저를 찾아온다.
          const userDoc = await users.find({ name });
          // 최종적으로 걸러낸 진짜 유저다.
          const users = findPhoneNumber(password); //find로 찾은 유저들 중 password로 정확한 유저를 찾아주는 함수;
          //토큰의 수명
          const options = {
            expiresIn: "12h", // 12시간
          };
          if (users) {
            jwt.sign(
              { id: users._id, name: users.name },
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
        ```

        이후 만들어진 쿠키를 통해 지속적인 로그인 상태를 유지 할 수 있다.
        <br>
        <br>

> `---` 등으로 구분하지 않아도 list 형태가 유지된다면 구분될 수 있음
 
---

> 불필요한 단락 나눔 <br>
- ### 로그인 모달페이지만들기 <br>

> indent 구분 확실히
 
- 왜 모달인가?

  따로 로그인을 위한 페이지를 만들어 라우팅처리하는 것도 좋겠지만 로그인은 사이트를 이용하는 내내 지속적으로 발생할 상황이다. 그렇기에 그때마다 로그인 페이지로 보내서 사용의 흐름을 끊는 것은 효율적인 방법이 아니다. - 스토리텔링적으로 
 
  그렇기에 여기서 사용할 것은 모달페이지다.
  모달은 무엇인가? 간단히 말하자면 화면에 레이어를 하나더 까는 것이다.

- 팝업과 다른 점은?

  모달은 화면에 레이어를 까는 것이고
  팝업은 하나의 창을 더 띄우는 것이다. <br>
  모달은 작업 완료를 위해 반드시 해야하는 작업을
  보여주고 팝업은 정보 제공이나 추가 기능을 위해 사용된다.

  즉 로그인 작업은 사이트를 이용하기 위해서 반드시 해야 하는 작업이기 때문에 모달을 사용해야한다.

  > 엔터 하나로는 개행이 안되기 때문에 아래가 title과 desc를 작성한건지, title만 작성한건지 구분이 안됨
 
  - 어떻게 만들지?
    사용할 라이브러리는 `react-modal ` 이다.

    ```jsx
      import Modal from "react-modal";
      function App() {
        return <Modal isOpen={true}>모달입니다.</Modal>;
      }
    ```
    
    간단한 방법이다. isOpen의 값이 true면 모달이 지금 화면에 레이어된다.  
    그걸 위해서
    isOpen의 값을 전역처리 할것이다. - `jotai` 를 이용한다.

## !! 여기서 문제가 생겼다. !!

내가 css를 꾸미기 위해 `emotion` 라이브러리를 사용한다. 하지만 모달자체에 스타일을 넣을 수가 없다!

> wrapper -> 래퍼
방법은? 모달을 웨퍼로 감싸준다!

```jsx
//react-modal은 emotion/styled로 스타일을 바꿀 수 없다.
//그래서 이 래퍼가 필요한 것이다.
import React from "react";
import Modal from "react-modal";

export const ModalDecorator = ({ className, ...props }) => {
  const [name] = (className && className.split(" ")) || [""];
  const styles = name
    ? {
        portalClassName: name,
        overlayClassName: `${name}__Overlay`,
        className: `${name}__Content`,
      }
    : {};

  return <Modal {...styles} {...props} />;
};
```

이제 `emotion`을 이용하여 스타일을 바꿀 수 있게 되었다. 이제 모달 페이지를 꾸미고 모달에서 적힌 값을 서버에 post하게 만들어 주면 된다.(`useState`나 ` axios.post`로)

---

### - 2. 헤더 만들기

두가지 헤더를 만들어야한다.

1.  전체 페이지에 깔릴 헤더
    > 여기는 indent 구분 잘 되어있음 :+1
     
    로그인 상황이나 검색데이터 등 사이트 전체에 사용될 데이터나 상태를 저장하기 위해 필요하다.  
    헤더는 이전에도 만들어 봤다. 이 헤더에서 중요한 것은 로그인 상태를 확인하게 만들어 줘야한다는 것이다.

    일단 로그인이 되어 있는가 와 로그인 한 유저의 데이터는 이미 저장되어 있다.

    ```jsx
    // 로그인이 되어 있는가?를 확인하고 저장하는 atom
    export const loginStates = atom(false);

    // 유저데이터가 저장된다.
    export const userDataAtom = atom({
      login: false,
      token: false,
      name: "",
      password: "",
      id: "",
    });
    ```

    > 하지만 여기서부터는 indent 구분이 안되어있음

    `jotai`로 만든 atom를 사용하면 된다. `emotion`으로 loginStates 가 true일 때 리렌더링 되게 만들면 된다.

    ```jsx
      const [userDatas, setUserData] = useAtom(userDataAtom); //userData

     // 삼항연산자는 언제나 유용하다.
        return (
        <LoginMenus>
          <LoginMenuIcon onClick={toggleLoginMenu} userData={userDatas.login}>
            <SlMenus />
            <FiUsers user={userDatas.login} />
            {loginState === true ? <Namespan>{userDatas.name}</Namespan> : ""}
          </LoginMenuIcon>

          {loginMenuToggle === true ? <LoginMenuBox /> : ""}
        </LoginMenus>
      );

    const FiUsers = styled(FiUser)`
      font-size: 20px;
      border-radius: 10px;
      color: white;
      width: 30px;
      height: 20px;
      background-color: ${(props) => {
        return props.user === false ? "gray" : "red";
      }};
    `;

    ```
    `emotion`은 컴포넌트로 받아온 프롭스로 상태를 변환 시킬 수 있다. 유용한 기능이다.

2.  메인페이지에 사용될 해더
    단순히 검색 용이다. 숙소 type를 저장하여 분류하는데 쓸것이다. <br>

    아이콘은 `react-icons `에서 가져올 것이다. -차기에 아이콘을 이용하는 게 좋을것이라는 결론이 나왔다. 그리 종류가 많지 않다.  
    `swiper` 를 통해 스와이퍼 슬라이드를 가져온다. 샘플을 사용할 것이다.
    그리고 버튼을 눌렀을 때 value로 가져온 숙소 리스트에서 tyep를 필터 하면 된다.

    문제가 생겼다. 아이콘을 눌렀을 때와 버튼을 눌렀을 때 값이 다르다.
    즉 버튼을 눌렀을 때 버튼의 값을 event.taget.value로 가져오기 때문에 `react-icons `로 가져온 event에는 내가 원하는 value가 없다. 그렇다면 ?

    ```jsx
    // PointerEvents
    <SwiperSlides>
      <button value="surprise" key="surpriseButton" onClick={clickIcon}>
        <PointerEvents>
          <GiSurprised />
        </PointerEvents>
        깜짝!
      </button>
    </SwiperSlides>
    ```
    
    > 텍스트와 코드블럭은 구분할 것 <br/>
 
    여기서 주목해야 할 건 `<PointerEvents>`이다

    ```jsx
    const PointerEvents = styled.div`
        pointer-events: none;
    `;
    ```

    이렇게 처리하면 된다.
    그럼 pointer-events는 뭘까??

    이 요소와 그 하위 요소에서 마우스 및 터치 이벤트를 비활성화하며, 투명한 요소를 다른 요소 위에 오버레이하면서 기존 요소와 상호 작용을 방지하고자 할 때 사용된다. 즉 PointerEvents 사이에 감싸져 있는 아이콘은 포인터 이벤트를 비활성화된 상태가 된다.

---

### -4. 로그인페이지를 업그레이드 해보자. 데이터베이스를 사용하는 법

이전에 서버에 직접 입력한 api로 데이터를 가져와 로그인 기능을 만들었다. 간단한 기능이지만 실제 웹을 만들어 내는 데 사용하기에는 기능이 저열하다고 볼 수 있다.

서버를 만들었고 이제는 데이터베이스(DB)를 사용하는 법을 알아보자

---

- 1.  MongoDB Atlas란?
      이번에 사용해 볼 DB는 `MongoDB ` Atlas다
      MongoDB는
      MongoDB Atlas는 클라우드에서 제공되는 완전관리형 NoSQL 데이터베이스 서비스다.
      즉 인터넷으로 접근 가능하다 그럼 NoSQL이란 뭘까?
      NoSQL SQL이 아니라는 뜻이다. SQL은 관계형 데이터베이스를 말한다.

    다음은 둘의 차이를 정리한 표다

    |                    | NoSQL                             | SQL                    |
    | ------------------ | --------------------------------- | ---------------------- |
    | 데이터 스키마      | 유연한 스키마                     | 고정된 스키마          |
    | 데이터 모델        | 비관계형 데이터 모델              | 관계형 데이터 모델     |
    | 확장성             | 수평적 확장 가능                  | 수직적 확장 가능       |
    | 쿼리               | 단순한 쿼리 언어 사용             | 복잡한 쿼리 언어 사용  |
    | 데이터 무결성      | 일부 제공                         | 보장                   |
    | 대규모 데이터 처리 | 적합                              | 적합                   |
    | 사용 사례          | 웹 어플리케이션, 빅데이터 분석 등 | 기업용 애플리케이션 등 |

    즉 NoSQL은 유연하고 수평적 확장이 가능하다.

---

> indent가 맞지 않고, 리스트 작성인지 확실하지 않음
- 2.  Mongoose
      -Mongoose는 Node.js와 MongoDB를 위한 ODM(Object Data Mapping) library이다. Java 기반의 Hibernate. iBatis 등의 ORM(Object Relational Mapping)과 유사한 개념이다.

      사용법

    1.  `MongoDB ` 에 아이디를 만든다. 이는 이걸로 나만의 데이터베이스를 만들 수 있다.(물론 공유지만)
    2.  mongoose로 서버와 데이터 베이스를 연결한다.
    ```jsx
    // 간단하게 데이터베이스와 서버를 연결 할 수 있었다. 
    const mongoose = require("mongoose");
    mongoose.connect(DB_URL_TEST);
    ```

    3.  스키마를 만들고 모델을 만든다. 스키마는 타입스크립트에 타입을 정하듯 만드는 게 좋다.

    - 스키마란?  
      여기서 스키마는 MongoDB의 도큐먼트에 대한 구조화된 정의를 의미하며 타입스크립트처럼 어떤 틀이라고 생각하면 된다. 즉, 데이터가 어떤 형태로 저장되어야 하는지를 정의하는 것이다.

    - 모델이란?  
      모델은 스키마를 기반으로 만들어진 객체이며 데이터베이스의 컬렉션(collection)과 일대일 대응한다 컬렉션은 MongoDB에서 도큐먼트를 저장하는 공간을 의미한다. 모델을 사용하면 컬렉션에서 데이터를 생성, 조회, 수정, 삭제할 수 있으며 Mongoose는 모델을 생성할 때 스키마를 인자로 받아 모델을 생성한다.

    이렇게 생성된 모델을 사용하여 CRUD(Create, Read, Update, Delete) 작업을 수행할 수 있다.

    즉, 스키마는 데이터 모델의 구조를 정의하고, 모델은 스키마를 기반으로 데이터를 다루는 기능을 제공하며 이를 통해 Mongoose는 MongoDB와 함께 사용할 때 데이터 모델링과 데이터 처리를 편리하게 할 수 있게 된다.

    ```jsx
    // 스키마

    const mongoose = require("mongoose");

    const userSchema = mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      password: String,
      phoneNumber: Number,
      countryCode: String,
    });

    // 모델
    const userModel = mongoose.model(`User`, userSchema);

    module.exports = userModel;
    ```

    그리고 이걸 서버에 가져와서 적용한다.

    4.  서버에 연결하기

    ```jsx
    // 만들어 놓은 모델을 가져온다.
    const User = require(`./models/user.jsx`);

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

    // 여기서 User.create 은 몽구스의 CRUD로 사용되며 객체로 저장된다.
    ```

---

- 3.  dotenv

    - 환경 변수를 파일에 저장해놓고 접근할 수 있게 도와주는 dotenv 라이브러리다

    - 환경변수란?

환경 변수(Environment Variable)는 운영 체제에서 제공하는 변수로, 컴퓨터 시스템에서 사용되는 값을 저장하고 있는 변수다. 환경 변수는 특정 프로세스나 프로그램에서 참조할 수 있는 전역 변수(global variable)로 사용된다.

> ?
 
***

- 4.  bcypt

    > bcypt는 블로피시 암호에 기반을 둔 암호화 해시 함수로서 Niels Provos와 David Mazières가 설계하였으며 1999년 USENIX에서 발표되었다.

    페스워드를 해시 함수로 만들어준다.
    해시 함수란?  
    해시 함수(Hash Function)는 임의의 길이의 데이터를 고정된 길이의 데이터로 매핑하는 함수를 말한다.

    해시 함수는 일반적으로 다음과 같은 특징을 가지고 있다.

    - 동일한 입력 값에 대해서는 항상 동일한 해시 값을 반환
    - 입력 값이 조금이라도 다르면 완전히 다른 해시 값을 반환
    - 입력 값이 매우 크더라도 일정한 크기의 해시 값으로 변환
    - 해시 값을 역산하여 입력 값을 구하는 것은 매우 어럽다. (단방향성)

    즉 패스워드를 복호화 해준다. 이전처럼 데이터로 들어온 페스워드를 그대로 저장하는 것이 아닌 복호화 한다고 볼 수 있다. 복호화 해 놓은 함수는 사이트 보안에 안정성을 줄 수 있게 된다.

    ```jsx
    // bcypt
    const bcrypt = require("bcrypt");
    // 솔드를 생성하는 함수다. 여기서 10은 솔트의 길이를 나타낸다.  비밀번호를 검증할 때 다시 사용됨.
    const userPasswordBcrypt = bcrypt.genSaltSync(10);

    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, userPasswordBcrypt),
      countryCode,
      phoneNumber,
    });

    password: bcrypt.hashSync(password, userPasswordBcrypt),

    // hashSync 암호를 해시화 한다. 입력한 데이터와 솔트를 조합하여 새로운 솔트값을 만들어냄
    // 첫 인자를 값 두번째 인자로 솔트를 받는다.
    ```
---

- 5.  jsonwebtoken
    이전에 쿠키라고 했지만 이는 잘못된 정보다. 쿠키와 토큰은 다르다.

    쿠키와 토큰의 차이를 알아보자

    - 토큰이란 무엇인가??

    토큰은 서버에서 발급한 암호화된 문자열로, 사용자 인증 정보를 저장하고 인증하며 클라이언트는 이 토큰을 저장하고, 이후 모든 요청에 대해 토큰을 서버에 전송한다.(로그인 데이터) 서버는 이 토큰을 확인하여 인증에 사용한다. 토큰은 보안성이 높아 중요한 데이터를 저장하기에 적합하다.

    - withCredentials
      withCredentials 옵션은 단어의 의미에서 알 수 있듯이, 서로 다른 도메인(크로스 도메인)에 요청을 보낼 때 요청에 credential 정보를 담아서 보낼 지를 결정하는 항목 입니다.

          여기서, credential 정보가 포함되어 있는 요청은 아래 두 가지 경우를 의미합니다.

          1. 쿠키를 첨부해서 보내는 요청
          2. 헤더에 Authorization 항목이 있는 요청
             따라서, 보내고자 하는 요청이 위 두 가지 항목 중 한 가지라도 포함하고 있다면 withCredentials 옵션을 true로 설정해야만 합니다.

    |           | 쿠키                                      | 토큰                                             |
    | --------- | ----------------------------------------- | ------------------------------------------------ |
    | 저장 위치 | 클라이언트 브라우저                       | 클라이언트 브라우저 또는 메모리, 데이터베이스 등 |
    | 보안성    | 낮음                                      | 높음                                             |
    | 유효 기간 | 설정 가능                                 | 설정 가능                                        |
    | 용량      | 작음                                      | 대체로 작음                                      |
    | 전송 방식 | 모든 HTTP 요청에 포함됨                   | 수동으로 HTTP 헤더에 포함시켜 전송               |
    | 예시      | 로그인 상태 유지, 사용자 설정 등에 사용됨 | API 인증 등에 사용됨                             |

---

- 6.  cookie-parser

    > 이 패키지를 사용하면 Node.js 서버에서 클라이언트가 보낸 쿠키 데이터를 쉽게 처리할 수 있습니다. 쿠키는 클라이언트 측에서 저장되는 작은 데이터 조각으로, 웹 애 플리케이션에서 로그인 상태 유지, 세션 관리 등에 사용됩니다. cookie-parser를 사용하면 서버에서 이러한 쿠키 데이터를 쉽게 읽을 수 있으며, 클라이언트에게 응답 할 때 새로운 쿠키를 설정할 수도 있습니다.

    즉 쿠키 데이터를 JavaScript 객체로 변환하는 기능을 제공한다.

    ```jsx
        const cookieParser = require("cookie-parser");
        app.use(cookieParser());

        // req.cookies를 통해 쿠키 객체에 접근할 수 있습니다. 이를 통해 쿠키의 값을 가져오거나, 쿠키에 값을 저장하거나 삭제할 수 있다.

        // 토큰이 있는지 없는지 검증이 가능해진다.

        const { token } = req.cookies;

        //req.cookies; 로 토큰을 불러와 토큰을 검증하고 저장한다
        const tokens = verifyToken(token);

        // 토큰이 있다면 이 함수를 실행시킨다.
        if (tokens) {
          jwt.sign({}, jwtSecret, { expiresIn: "1s" }, (err, token) => {
            if (err) throw err;

            res.cookie(`token`, token, { sameSite: "none", secure: true }).json("Love");
          });
        }
    ```

---

### -5. 마이페이지 만들기

- 1.  나의 계정페이지 만들기

    이전에 웹페이지를 만드는 방식과 같다.

    특별할것 없는 나중에 인증 기능을 추가하자

***

- 2.  acommodaton 숙박 업소 등록 하기

    - 1.회원가입과 비슷하다고 생각하면 된다. mongoose를 이용하여 스키마를 만들고 스키마로 모델을 만들어 acommodatonPage를 만들고 input을 만들어 서버에 명령어를 넣어주된다.

### !!근데 사진은???

#### 사진을 넣은 법은 두가지다

    - 1. 링크로

물론 이전에 배운 방식대로 인터넷에 떠도는 이미지를 가져올 수도 있다. img 태그에 링크만 입력해주면 ok
하지만 그걸로 될까? 안전하지 않다. 그럼? 이미지를 내가 가지고 있게 하자.

`Node Image Downloader`

```js
download.image({
   // 다운 받을 이미지의 url
    url: link,
    // 파일을 저장할 곳과 파일의 이름
     dest: __dirname + `/uploads/` + newName,})

  app.use("/uploads", express.static(\_\_dirname + "/uploads"));
```

node Image Downloader는 Node.js 환경에서 이미지를 다운로드하는 라이브러리다.

- 2. 내가 가진 디렉토리로

    - 나는 이것을 알고 있다. input type="file"
      솔직히 책에서 한번 보고 써보지는 않았다. 하지만 생각보다 간단하다.  
      내 저장 공간에 들어있는 파일을 가져올 수 있다. 그걸 value로 저장해준다.

    - multer 를 이용한다.

> Multer는 Node.js에서 파일 업로드를 처리하는 데 사용되는 미들웨어입니다. Multer는 multipart/form-data 형식으로 전송된 데이터를 처리할 수 있으며, Express 프레임워크와 함께 사용할 수 있습니다.

대부분의 지문은 useState로 저장한 뒤에 서버로 요청을 보내고 그걸 몽고 디비로 loginPage를 만드는 공정을 그대로 사용한다.

***

---

> 모든 키워드는 띄어쓰기로 구분을 해줘야 한다.

###-6 마침내 디테일 페이지를 만든다.

- 1.  디테일 페이지부터 만든다
      useParams로 가져온 id를 서버로 보내 DB에서 만든 Accommodation에서 find하게 만든다.
      그리고 그걸 map으로 랜더링한다.

    ```js
    let { id } = useParams();
    useEffect(() => {
      bookingSearch();
      itemSearch();
    }, []);

    // 디테일 페이지가 렌더링될 때 id로 Accommodation의 데이터를 가져온다.
    const itemSearch = async () => {
      const response = await axios.post(`http://127.0.0.1:4000/detailPage`, {
        id: id,
      });
      const Accommodation = response.data;
      setDetailData({ ...Accommodation });
      setItemSearchSuccess(true);
    };
    ```

- 2.  드디어! DetailPage에 예약 박스 만든다.
      예약 기능을 만들어 보자!

      !!! 근데 날짜는 어떻게 인식 시키지?

    - input date를 이용한다.
      그리고 !!date-fns!!

      `date-fns`란?

      > date-fns를 사용하면 날짜와 시간을 쉽게 파싱하고 포맷하며, 타임존과 관련된 문제를 다룰 수 있다!!

      그중 내가 사용할 메서드는

    1.  differenceInCalendarDays =
        이 함수는 두 날짜 간의 차이를 일(day) 단위로 계산하여 반환한다.
        즉 두 날짜가 며칠 차이나는지 알 수 있다.

        ```js
        import { differenceInCalendarDays } from "date-fns";

        const dateLeft = new Date(2023, 4, 1);
        const dateRight = new Date(2023, 4, 10);
        const diffInDays = differenceInCalendarDays(dateLeft, dateRight); // 9
        ```

    2.  format =
        주어진 날짜를 형식화하여 문자열로 반환한다.

        format 함수는 다음과 같은 두 개의 매개변수를 받습니다:

    - date: 형식화할 날짜 객체 (필수)

    - formatString: 형식화할 문자열 (선택)

      ```js
      import { format } from "date-fns";

      const date = new Date(2023, 4, 4, 10, 30, 0);

      const dateString = format(date, "yyyy/MM/dd HH:mm:ss");
      console.log(dateString); // "2023/05/04 10:30:00"
      ```

    이렇게 받아온 날짜와 날짜 간의 차이를 구해 총계된 price를 서버로 보낸다.  
    여기서 useParams 로 가져온 Accommodation id를 꼭 전달해 줘야한다.  
    어떤 Accommodation를 예약했는지 알아야하기 때문이다.

- 3.  서버에서  
      새로운 스키마와 모델(booking.jsx)을 만들어 DB에 저장하면된다.  
      방식자체는 회원가입과 로그인 숙소등록과 같다.

---

> 헤딩을 명확하게 할 것 <br/>
> 어느 레벨에 맞는 헤딩을 쓸지 타이틀을 명확하게 잡을것

## 4. 최종 완성된 기능

에어비앤비 클론 코딩

### 무엇을 만들었는가

- 1. 헤더의 마이페이지 버튼 오른쪽 상단에

    1. 회원가입기능
    2. 로그인 기능
    3. 로그아웃기능
    4. 검색기능- 아직 안만듬 근데 필요한 기능인지 모르겠음

- 2. 마이페이지-오른쪽 상단의 마이페이지 버튼을 누르면 나오는 마이페이지

    1. 개인정보
    2. 예약 상황- 예약을 해야 뭔가 나옴
    3. acommodatons에 들어가서 내가 가진 숙소를 등록하거나 확인, 수정가능

- 3. 메인 페이지

    1. 등록된 숙소를 데이터 베이스에서 꺼내와 뿌려줌
    2. 메인페이지 중단에 있는 아이콘들(한옥, 깜짝, 해변) 숙소를 등록할 때 선택한 숙소 타입으로 숙소를 필터링할 수 있게 함

- 4. 디테일페이지 - 메인페이지에서 원하는 숙소를 클릭하면 링크됨

    1. 페이지 렌더링 - 하드 코딩이라고 써있는 거 말고는 내가 혹은 타인이 등록한 숙소의 Data를 DB에서 가져와 렌더링함
    2. 예약 기능 - 체크인과 체크 아웃을 정하고 숙박비 계산을 누르면 예약 박스가 뜸
    3. 예약 기능2- 이름, 전화 번호를 넣고 예약하기를 누르면 DB에 저장됨 예약 사항은 마이페이지 예약 상황으로 확인 가능함

# 에어비앤비 클론 코딩

## 1. 무엇을 만들었는가?

에어비앤비 사이트를 클론 코딩했다. 이전에 node.js를 기반으로 서버를 만들기를 배웠기 때문에 이번에는 DB를 쓰는 법을 배워볼 것이다.

- 주요 개발 지점
  1. 로그인 만들기
  2. DB사용 방법

---

---

### 3. 어떻게 만들었는가

- -1. 로그인 페이지

  - 1.  api만들기 통신 주고 받기

  - 모달페이지만들기

  ***

- -2. 헤더 만들기

  - 라이브러리란? 꽤나 편하다.
  - 오브젝트로 key불러오기

  ***

- -3. 보너스 chatgpt로 에버비엔비 아이템을 만들어보자

  ***

- -4. 로그인페이지를 업그레이드 해보자. 데이터베이스를 사용하는 법

  ***

  - 1.  MongoDB Atlas란?

    ***

  - 2.  Mongoose
        -Mongoose는 Node.js와 MongoDB를 위한 ODM(Object Data Mapping) library이다. Java 기반의 Hibernate. iBatis 등의 ORM(Object Relational Mapping)과 유사한 개념이다.

    ***

  - 3.  dotenv

    - 환경 변수를 파일에 저장해놓고 접근할 수 있게 도와주는 dotenv 라이브러리에 대해서 알아보겟습니다.

    ***

  - 4.  bcypt

    - bcypt는 블로피시 암호에 기반을 둔 암호화 해시 함수로서 Niels Provos와 David Mazières가 설계하였으며 1999년 USENIX에서 발표되었다.

    ***

  - 5.  jsonwebtoken

    - 토큰이란 무엇인가??
    - withCredentials
      withCredentials 옵션은 단어의 의미에서 알 수 있듯이, 서로 다른 도메인(크로스 도메인)에 요청을 보낼 때 요청에 credential 정보를 담아서 보낼 지를 결정하는 항목 입니다.

      여기서, credential 정보가 포함되어 있는 요청은 아래 두 가지 경우를 의미합니다.

      1. 쿠키를 첨부해서 보내는 요청
      2. 헤더에 Authorization 항목이 있는 요청
         따라서, 보내고자 하는 요청이 위 두 가지 항목 중 한 가지라도 포함하고 있다면 withCredentials 옵션을 true로 설정해야만 합니다.

      ***

  - 6.  cookie-parser

    - 이 패키지를 사용하면 Node.js 서버에서 클라이언트가 보낸 쿠키 데이터를 쉽게 처리할 수 있습니다. 쿠키는 클라이언트 측에서 저장되는 작은 데이터 조각으로, 웹 애 플리케이션에서 로그인 상태 유지, 세션 관리 등에 사용됩니다. cookie-parser를 사용하면 서버에서 이러한 쿠키 데이터를 쉽게 읽을 수 있으며, 클라이언트에게 응답 할 때 새로운 쿠키를 설정할 수도 있습니다.

  ***

---

- -5. 마이페이지 만들기

  - 1.  나의 계정페이지 만들기

    - ***

  - 2.  acommodaton 숙박 업소 등록 하기

    - 1.회원가입과 비슷하다고 생각하면 된다. mongoose를 이용하여 스키마를 만들고 스키마로 모델을 만들어 acommodatonPage를 만들고 input을 만들어 서버에 명령어를 넣어주된다.

    ### !!근데 사진은???

    #### 사진을 넣은 법은 두가지다

    ## 1. 링크로

    물론 이전에 배운 방식대로 인터넷에 떠도는 이미지를 가져올 수도 있다. img 태그에 링크만 입력해주면 ok
    하지만 그걸로 될까? 안전하지 않다. 그럼? 이미지를 내가 가지고 있게 하자.

    - Node Image Downloader

      ```js
      download.image({
         // 다운 받을 이미지의 url
          url: link,
          // 파일을 저장할 곳과 파일의 이름
           dest: __dirname + `/uploads/` + newName,})

        app.use("/uploads", express.static(\_\_dirname + "/uploads"));
      ```

      node Image Downloader는 Node.js 환경에서 이미지를 다운로드하는 라이브러리입니다.

    ## 2. 내가 가진 디렉토리로

    - 나는 이것을 알고 있다. input type="file"  
       솔직히 책에서 한번 보고 써보지는 않았다. 하지만 생각보다 간단하다.
      내 저장 공간에 들어있는 파일을 가져올 수 있다. 그걸 value로 저장해준다.

    - multer 를 이용한다.

      2.  대부분의 지문은 useState로 저장한 뒤에 서버로 요청을 보내고 그걸 몽고 디비로 loginPage를 만드는 공정을 그대로 사용한다.

    ***

  ***

## -6 마침내 디테일 페이지를 만든다.

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

        date-fns란?

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

---

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

```

```

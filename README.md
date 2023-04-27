3. 무엇을 만들었는가


    -1. 로그인 페이지
    
        api만들기 통신 주고 받기
        모달페이지만들기 
      
  
    -2. 헤더 만들기 
    
        라이브러리란? 꽤나 편하다.
        오브젝트로 key불러오기 
    
    
    -3. 보너스 chatgpt로 에버비엔비 아이템을 만들어보자
      
    -4. 로그인페이지를 업그레이드 해보자. 데이터베이스를 사용하는 법  
    
        1. MongoDB Atlas란?
        2. Mongoose
            -Mongoose는 Node.js와 MongoDB를 위한 ODM(Object Data Mapping) library이다. Java 기반의 Hibernate. iBatis 등의 ORM(Object Relational Mapping)과 유사한 개념이다.
        3. dotenv 
            -환경 변수를 파일에 저장해놓고 접근할 수 있게 도와주는 dotenv 라이브러리에 대해서 알아보겟습니다.
            
        4. bcypt
            -bcypt는 블로피시 암호에 기반을 둔 암호화 해시 함수로서 Niels Provos와 David Mazières가 설계하였으며 1999년 USENIX에서 발표되었다. 
        5. jsonwebtoken
            -토큰이란 무엇인가?? 
            - withCredentials
            withCredentials 옵션은 단어의 의미에서 알 수 있듯이, 서로 다른 도메인(크로스 도메인)에 요청을 보낼 때 요청에 credential 정보를 담아서 보낼 지를 결정하는 항목               입니다.

              여기서, credential 정보가 포함되어 있는 요청은 아래 두 가지 경우를 의미합니다.

              1.쿠키를 첨부해서 보내는 요청
              2.헤더에 Authorization 항목이 있는 요청
              따라서, 보내고자 하는 요청이 위 두 가지 항목 중 한 가지라도 포함하고 있다면 withCredentials 옵션을 true로 설정해야만 합니다.
         6. cookie-parser
               이 패키지를 사용하면 Node.js 서버에서 클라이언트가 보낸 쿠키 데이터를 쉽게 처리할 수 있습니다. 쿠키는 클라이언트 측에서 저장되는 작은 데이터 조각으로, 웹 애                플리케이션에서 로그인 상태 유지, 세션 관리 등에 사용됩니다. cookie-parser를 사용하면 서버에서 이러한 쿠키 데이터를 쉽게 읽을 수 있으며, 클라이언트에게 응답                할 때 새로운 쿠키를 설정할 수도 있습니다.
              
    -5. 마이페이지 만들기 
    
          1. 나의 계정페이지 만들기
          
          2. acommodaton 숙박 업소 등록 하기
            
            1.회원가입과 비슷하다고 생각하면 된다. mongoose를 이용하여 스키마를 만들고 스키마로 모델을 만들어 acommodatonPage를 만들고 input을 만들어 서버에 명령어를 넣어주된다.
            !!근데 사진은???
                    사진을 넣은 법은 두가지다
                    -1. 링크로 
                        물론 이전에 배운 방식대로 인터넷에 떠도는 이미지를 가져올 수도 있다. img 태그에 링크만 입력해주면 ok
                        하지만  그걸로 될까? 안전하지 않다. 그럼? 이미지를 내가 가지고 있게 하자.
                       1. Node Image Downloader 
                       
                             download.image({
                                // 다운 받을 이미지의 url
                                url: link,
                                // 파일을 저장할 곳과 파일의 이름
                                dest: __dirname + `/uploads/` + newName,
                                })
                                
                                
                       2. app.use("/uploads", express.static(__dirname + "/uploads"));
                        
                        -Node Image Downloader는 Node.js 환경에서 이미지를 다운로드하는 라이브러리입니다.
                    -2. 내가 가진 디렉토리로 
                        나는 이것을 알고 있다. input type="file"

import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { userDataAtom, loginModals } from "../../../Store/Global/Index";

const PROXY =
  window.location.hostname === "localhost" ? "http://127.0.0.1:4000" : "/proxy";

function LoginBody() {
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginData, setLoginData] = useState(false);
  const [passwords, setPasswords] = useState("");
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginModal, setLoginModal] = useAtom(loginModals);

  const registerPost = async () => {
    try {
      const loginSuccessData = await axios.post(
        `${PROXY}/login`,
        {
          password: passwords,
          countryCode: countryCode,
          phoneNumber: phoneNumber,
        },
        {
          withCredentials: true, // credentials 설정
        }
      );

      setUserData({ login: true, token: true, ...loginSuccessData.data });
      setLoginModal(false);
    } catch (e) {
      alert("제출이 제대로 되지 않았음 왜일까????");
    }
  };

  // const handleButtonClick = (e) => {
  //   if (phoneNumber !== "" || passwords !== "") {
  //     serverLoginData();
  //   }
  // };
  // const serverLoginData = async () => {
  //   const response = await axios.get(`http://127.0.0.1:4000/api/countryCode`);
  //   const loginDatas = response.data;
  //   setLoginData(loginDatas?.find((item) => item.country === "Korea").user);
  // };

  // useEffect(() => {
  //   if (loginData.length > 1) {
  //     const user = loginData.find((user) => user.phoneNumber == phoneNumber);

  //     if (user.password == passwords) {
  //       setUserData({ login: true, ...user });
  //       setLoginModal(false);
  //     }
  //   }
  // }, [loginData]);

  return (
    <BodyBox>
      <h1>에어비앤비에 오신 걸 환영합니다</h1>
      <FormBox>
        <Select
          onChange={(e) => {
            setCountryCode(e.target.value);
          }}
        >
          <option value="1">미국(+1)</option>
          <option value="60">말레이시아(+60)</option>
          <option value="82">한국(+82)</option>
          <option value="595">파라과이(+595)</option>
          <option value="이하 생략">이하 생략</option>
        </Select>
        <Input
          type="text"
          value={phoneNumber}
          placeholder={`${countryCode} 핸드폰 번호를 적어주세요`}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        ></Input>
        <Input
          type="password"
          value={passwords}
          placeholder="비밀번호입력해줘"
          onChange={(e) => {
            setPasswords(e.target.value);
          }}
        ></Input>
      </FormBox>
      <Counseling>
        전화나 문자로 전화번호를 확인하겠습니다. 일반 문자 메시지 요금 및 데이터
        요금이 부과됩니다.
        <div>개인정보처리방침</div>
      </Counseling>
      <Button onClick={registerPost}>계속</Button>
    </BodyBox>
  );
}

export default LoginBody;

const BodyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.div`
  border: 0.3px solid black;
  width: 280px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Select = styled.select`
  width: 280px;
  border: 1px solid black;
  border-radius: 5px;
`;

const Input = styled.input`
  border-radius: 5px;
  width: 279px;
`;

const Counseling = styled.div`
  font-size: 0.5px;
`;

const Button = styled.button`
  /* Fix: Changed from "div" to "button" for Button component */
  width: 280px;
  border: 1px solid red;
  border-radius: 5px;
`;

/*
  주석:
  - 오탈자 수정
  - 컴포넌트는 UpperCamelCase로 작성하고, 일반 코딩은 lowerCamelCase로 작성해야 합니다.
  - 기존 주석 유지
  - 수정된 내용을 코드 아래 주석으로 남겨야 합니다.
  - 수정 내용:
    - FromBox -> FormBox (오탈자 수정)
    - Button 컴포넌트의 태그를 "div"에서 "button"으로 수정
*/

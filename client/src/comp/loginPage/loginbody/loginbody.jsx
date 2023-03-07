import styled from "@emotion/styled";
import React, { useState } from "react";

function Loginbody() {
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleButtonClick = (e) => {
    if (phoneNumber !== "") {
      console.log(phoneNumber);
    }
  };

  return (
    <BodyBox>
      <h1>에어비앤비에 오신 걸 환영합니다</h1>
      <FromBox>
        <Select
          onChange={(e) => {
            setCountryCode(e.target.value);
          }}
        >
          <option value="+1">미국(+1)</option>
          <option value="+60">말레이시아(+60)</option>
          <option value="+82">한국(+82)</option>
          <option value="+595">파라과이(+595)</option>
          <option value="이하 생략">이하 생략</option>
        </Select>
        <Input
          type="text"
          value={phoneNumber}
          placeholder={countryCode}
          onChange={(e) => {
            console.log(e.target.value);
            setPhoneNumber(e.target.value);
          }}
        ></Input>
      </FromBox>
      <Counseling>
        전화나 문자로 전화번호를 확인하겠습니다. 일반 문자 메시지 요금 및 데이터
        요금이 부과됩니다.
        <div>개인정보처리방침</div>
      </Counseling>
      <Button onClick={handleButtonClick}>계속</Button>
    </BodyBox>
  );
}

export default Loginbody;
const BodyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FromBox = styled.div`
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

const Button = styled.div`
  width: 280px;
  border: 1px solid red;
  border-radius: 5px;
`;

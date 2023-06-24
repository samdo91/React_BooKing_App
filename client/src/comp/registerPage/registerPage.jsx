import React, { useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import Header from "../Header/Header";
function RegisterPage() {
  /* 
    회원가입에 필요한 양식 
    name: 이름
    email: 말그대로 이메일 스키마로 유니크한 값을 먹여줌
    password: 비밀번호, input을 패스워드로만들어서 값이 안보인다. 
    countryCode: 핸드폰 번호에 들어가는 국가 코드 
    phoneNumber: 핸드폰 번호
     */
  const [name, setNames] = useState("");
  const [email, setEmails] = useState("");
  const [password, setPasswords] = useState("");
  const [countryCode, setCountryCode] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");

  // axios.post로 보낸다.
  const registerPost = async () => {
    try {
      await axios.post("http://127.0.0.1:4000/register", {
        name: name,
        email: email,
        password: password,
        countryCode: countryCode,
        phoneNumber: phoneNumber,
      });
      window.location.href = "/";
    } catch (e) {
      alert("제출이 제대로 되지 않았음 왜일까?");
    }
  };

  const postUserData = (e) => {
    e.preventDefault();
    registerPost();
    // if (
    //   phoneNumber !== "" ||
    //   password !== "" ||
    //   name !== "" ||
    //   email !== "" ||
    //   countryCode !== ""
    // ) {
    //   registerPost();
    // }
  };
  return (
    <>
      <header>
        <Header />
      </header>
      <Body>
        <H1>RegisterPage</H1>

        <Form onSubmit={postUserData}>
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
            placeholder={`${countryCode} 핸드폰 번호를 입력해주세요`}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          ></Input>

          <Input
            type="text"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={(event) => {
              setNames(event.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(event) => {
              setEmails(event.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(event) => {
              setPasswords(event.target.value);
            }}
          />
          <Button>제출 </Button>
        </Form>
      </Body>
    </>
  );
}

export default RegisterPage;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  width: 280px;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  border-radius: 5px;
  border: 1px solid black;
  width: 279px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 280px;
  border: 1px solid red;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff0000;
  color: white;
`;

const H1 = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`;

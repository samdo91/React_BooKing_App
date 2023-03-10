import styled from "@emotion/styled";
import React from "react";

function LoginFooter() {
  return (
    <LoginFooterBox>
      <And>------------------------------또는-----------------------------</And>
      <Div>페이스북으로 로그인하기</Div>
      <Div>구글로 로그인하기</Div>
      <Div>애플로 로그인하기</Div>
      <Div>이메일로 로그인하기</Div>
    </LoginFooterBox>
  );
}

export default LoginFooter;
const LoginFooterBox = styled.div`
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  align-items: center;
  //   justify-content: space-around;
  justify-content: space-evenly;
  //   justify-content: flex-end;
  height: 140px;
`;

const And = styled.div`
  font-size: 5px;
  color: #e0e0e9;
`;

const Div = styled.div`
  border-radius: 5px;
  width: 280px;
  border: 0.8px solid black;
  :hover {
    background-color: #e9e9e9;
  }
`;

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
  align-items: center;
  justify-content: space-evenly;
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
  &:hover {
    /* Fix: Changed ":hover" to "&:hover" for hover effect in Div component */
    background-color: #e9e9e9;
  }
`;

/*
  주석:
  - 오탈자 수정
  - 컴포넌트는 UpperCamelCase로 작성하고, 일반 코딩은 lowerCamelCase로 작성해야 합니다.
  - 기존 주석 유지
  - 수정된 내용을 코드 아래 주석으로 남겨야 합니다.
  - 수정 내용:
    - LoginFooterBox: 주석 제거, justify-content 수정 (주석 내용 삭제, space-around -> space-evenly)
    - And: 주석 제거
    - Div: 주석 제거, hover 효과 적용 변경 (주석 내용 삭제, ":hover" -> "&:hover")
*/

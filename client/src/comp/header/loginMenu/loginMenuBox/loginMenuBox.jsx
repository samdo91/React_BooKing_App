import React from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { loginModals } from "../../../store/global";
function LoginMenuBox() {
  const [loginModal, setLoginModal] = useAtom(loginModals);
  return (
    <PopUp>
      <LoginMenu>
        <div
          onClick={() => {
            setLoginModal(true);
          }}
        >
          회원가입
        </div>
        <div
          onClick={() => {
            setLoginModal(true);
          }}
        >
          로그인
        </div>
        <div>당신의 공간을 에어비앤비하세요</div>
        <div>체험 호스팅하기</div>
        <div>도움말</div>
      </LoginMenu>
    </PopUp>
  );
}

export default LoginMenuBox;
const PopUp = styled.div`
  display: inline-block;
  width: 100px;
  height: 300px;
  vertical-align: middle;
  float: right;
`;

const LoginMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  border-radius: 10px;
  width: 100px;
  height: 200px;
  background-color: White;
  border: 1px solid #e9e9e9; ;
`;

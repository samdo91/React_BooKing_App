import React from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { loginModals } from "../../../store/global";
function LoginMenuBox() {
  const [loginModal, setLoginModal] = useAtom(loginModals);
  return (
    <PopUp>
      <LoginMenu>
        <Membership
          onClick={() => {
            setLoginModal(true);
          }}
        >
          회원가입
        </Membership>
        <LoginButton
          onClick={() => {
            setLoginModal(true);
          }}
        >
          로그인
        </LoginButton>
        <SellMyAirbnb>당신의 공간을 에어비앤비하세요</SellMyAirbnb>
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
  height: 200px;
  vertical-align: middle;
  float: right;
  font-size: 5px;
`;

const LoginMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  border-radius: 10px;
  width: 100px;
  height: 100px;
  background-color: White;
  border: 1px solid #e9e9e9; ;
`;

const SellMyAirbnb = styled.div`
  font-size: 0.5px;
`;

const Membership = styled.div`
  font-weight: bold;
`;

const LoginButton = styled.div`
  border-bottom: 1px solid #c0c0c0;
  margin-bottom: 5px;
`;

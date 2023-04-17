import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import {
  loginModals,
  loginMenuToggles,
  userDataAtom,
} from "../../../store/global";
function LoginMenuBox() {
  /*loginModal: true면 모달창이 떠있음 
  loginMenuToggle: 상단 로그인 창의 메뉴를 토글함
  userData: 말그대로 유저 데이터가 들어가있음 
  login: false, - 이걸로 로그인이 되었는지 안되어 있는지 알 수 있음
  name: "",
  phoneNumber: "",
  password: "",

     */
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [loginMenuToggle, setLoginMenuToggle] = useAtom(loginMenuToggles);
  const [userDatas, setUserData] = useAtom(userDataAtom);
  useEffect(() => {
    if (loginModal === true) {
      setLoginMenuToggle(false);
    }
  }, [loginModal]);
  return (
    <PopUp>
      <LoginMenu userData={userDatas.login}>
        {userDatas.login === true ? (
          <LoginButton>마이페이지</LoginButton>
        ) : (
          <dic>
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
          </dic>
        )}

        <SellMyAirbnb>당신의 공간을 에어비앤비하세요</SellMyAirbnb>
        <Span>체험 호스팅하기</Span>
        <Span>도움말</Span>
      </LoginMenu>
    </PopUp>
  );
}

export default LoginMenuBox;
const PopUp = styled.div`
  display: inline-block;
  width: 200px;
  height: 200px;
  vertical-align: middle;
  font-size: 5px;
  margin: 10px;
`;

const LoginMenu = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  border-radius: 10px;
  width: 200px;
  height:  ${(props) => {
    props.userDatas ? "200px" : "200px";
  }}
  background-color: White;
  border: 1px solid #e9e9e9; ;
`;

const SellMyAirbnb = styled.div`
  font-size: 15px;
  :hover {
    background-color: #e9e9e9;
  }
`;

const Membership = styled.div`
  font-size: 15px;
  font-weight: bold;
  :hover {
    background-color: #e9e9e9;
  }
`;

const LoginButton = styled.div`
  font-size: 15px;
  border-bottom: 1px solid #c0c0c0;
  margin-bottom: 5px;
  :hover {
    background-color: #e9e9e9;
  }
`;
const Span = styled.div`
  font-size: 15px;
  :hover {
    background-color: #e9e9e9;
  }
`;

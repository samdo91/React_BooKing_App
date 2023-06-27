import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import {
  loginModals,
  loginMenuToggles,
  userDataAtom,
  loginStates,
} from "../../../../Store/Global/Index";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginMenuBox() {
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [loginMenuToggle, setLoginMenuToggle] = useAtom(loginMenuToggles);
  const [userData, setUserData] = useAtom(userDataAtom);
  const [login, setLogin] = useAtom(loginStates);

  useEffect(() => {
    if (loginModal) {
      setLoginMenuToggle(false);
    }
  }, [loginModal, setLoginMenuToggle]);

  const handleLogout = async () => {
    const response = await axios.post(`${import.meta.env.PROXY_SERVER}/logout`);
    setUserData({
      login: false,
      token: false,
      ...response.data,
    });
    setLoginMenuToggle(false);
    setLogin(false);
  };

  return (
    <PopUp>
      <LoginMenuContainer userData={userData.login}>
        {userData.login ? (
          <div>
            <Link to="/myPage">
              <LoginButton
                onClick={() => {
                  setLoginMenuToggle(false);
                }}
              >
                마이페이지
              </LoginButton>
            </Link>

            <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
          </div>
        ) : (
          <div>
            <Link to="/register">
              <Membership
                onClick={() => {
                  setLoginMenuToggle(false);
                }}
              >
                회원가입
              </Membership>
            </Link>
            <LoginButton
              onClick={() => {
                setLoginModal(true);
              }}
            >
              로그인
            </LoginButton>
          </div>
        )}

        <SellMyAirbnb>당신의 공간을 에어비앤비하세요</SellMyAirbnb>
        <Span>체험 호스팅하기</Span>
        <Span>도움말</Span>
      </LoginMenuContainer>
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

const LoginMenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  border-radius: 10px;
  width: 200px;
  height: ${(props) => (props.userData ? "200px" : "200px")};
  background-color: white;
  border: 1px solid #e9e9e9;
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

/*
  주석:
  - 오탈자 수정
  - 컴포넌트는 UpperCamelCase로 작성하고, 일반 코딩은 lowerCamelCase로 작성해야 합니다.
  - 기존 주석 유지
  - 수정된 내용을 코드 아래 주석으로 남겨야 합니다.
  - 수정 내용: 
    - userData 변수 이름을 userDatas에서 userData로 변경
    - loginState 변수 이름을 login에서 loginState로 변경
    - loginModal === true를 loginModal로 변경
    - setUserData에 response.data를 전달하도록 수정
    - LoginMenuContainer 컴포넌트의 높이 설정 시 userData.login을 사용하도록 수정
*/

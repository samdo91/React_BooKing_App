import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { SlMenu } from "react-icons/sl";
import { FiUser } from "react-icons/fi";
import {
  loginMenuToggles,
  userDataAtom,
  loginStates,
} from "../../../Store/Global/Index";
import { useAtom } from "jotai";
import axios from "axios";
import LoginMenuBox from "./LoginMenuBox/LoginMenuBox";

function LoginMenu() {
  const [loginMenuToggle, setLoginMenuToggle] = useAtom(loginMenuToggles);
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginState, setLoginState] = useAtom(loginStates);

  const loginCookie = async () => {
    let response;
    try {
      response = await axios.post(`${process.env.PROXY_SERVER}/profile`);
      if (response.data === false) {
        return;
      } else {
        setUserData({ login: true, token: true, ...response.data });
      }
    } catch (e) {}
    return response?.data;
  };

  useEffect(() => {
    if (userData.token === false) {
      loginCookie();
    }
  }, [userData.token]);

  useEffect(() => {
    if (userData.login == true) {
      console.log(2);
      setLoginState(true);
    }
  }, [userData]);

  const toggleLoginMenu = () => {
    setLoginMenuToggle(!loginMenuToggle);
  };

  return (
    <LoginMenuContainer>
      <LoginMenuIcon onClick={toggleLoginMenu} userData={userData.login}>
        <SlMenus />
        <FiUsers user={userData.login} />
        {loginState === true ? <NameSpan>{userData.name}</NameSpan> : null}
      </LoginMenuIcon>

      {loginMenuToggle && <LoginMenuBox />}
    </LoginMenuContainer>
  );
}

export default LoginMenu;

const LoginMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-right: 20px;
  width: 100px;
`;

const LoginMenuIcon = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e9e9e9;
  border-radius: 15px;
  height: 30px;
  justify-content: space-between;
  box-shadow: 0.5px 0.5px 0 #c0c0c0;
  width: 100px;
`;

const SlMenus = styled(SlMenu)`
  font-size: 15px;
`;

const FiUsers = styled(FiUser)`
  font-size: 20px;
  border-radius: 10px;
  color: white;
  width: 30px;
  height: 20px;
  background-color: ${(props) => (props.user === false ? "gray" : "red")};
`;

const NameSpan = styled.span`
  font-size: 15px;
  width: 100px;
`;

/*
  주석:
  - 오탈자 수정
  - 컴포넌트는 UpperCamelCase로 작성하고, 일반 코딩은 lowerCamelCase로 작성해야 합니다.
  - 기존 주석 유지
  - 수정된 내용을 코드 아래 주석으로 남겨야 합니다.
  - 수정 내용:
    - userData 변수 이름을 userDatas에서 userData으로 변경
    - logincookie 함수 이름을 loginCookie로 변경
    - setLoginMenuToggle 함수 호출 시에 로그인 메뉴 토글 상태를 부정연산자를 사용하여 설정
    - userDatas.login을 userData.login으로 변경
    - LoginMenuContainer 컴포넌트 이름을 LoginMenuContainer로 변경
    - userDatas.token을 userData.token으로 변경
    - response?.data에 Optional chaining operator를 사용하여 undefined인 경우를 처리
    - loginMenuToggle === true를 loginMenuToggle로 변경
    - null을 사용하여 조건이 false인 경우 렌더링하지 않도록 수정
    - <LoginMenuBox /> 컴포넌트 렌더링 시에 중괄호({})를 사용하지 않고 조건만으로 렌더링하도록 수정
*/

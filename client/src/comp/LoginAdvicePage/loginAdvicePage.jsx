import React, { useEffect } from "react";
import { useAtom } from "jotai";
import {
  userDataAtom,
  loginModals,
  loginStates,
} from "../../Store/Global/Index";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import LoginPopUp from "../LoginPage/LoginPopUp";

function LoginAdvicePage() {
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [loginState, setLoginState] = useAtom(loginStates);

  useEffect(() => {
    if (!loginState) {
      setLoginModal(true);
    }
  }, []);

  return (
    <MyPageBody login={userData.login}>
      <div>
        로그인이 되지 않았습니다. 로그인 버튼을 눌러 로그인을 하거나 회원가입
        해주세요.
      </div>
      <div>
        <Button
          onClick={() => {
            setLoginModal(true);
          }}
        >
          로그인
        </Button>

        <Link to="/register">
          <Button>회원가입</Button>
        </Link>
      </div>

      {loginModal ? <LoginPopUp /> : ""}
    </MyPageBody>
  );
}

export default LoginAdvicePage;

const MyPageBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 100px;
  flex-direction: ${(props) => (props.login === false ? "column" : "row")};
`;

const Button = styled.button`
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  background-color: #f5002d;
  color: white;
  padding: 40px; /* Fix: Corrected the typo "paddiog" to "padding" */
  margin: 15px;
  width: 100px;
`;

/*
  주석:
  - 오탈자 수정
  - 컴포넌트는 UpperCamelCase로 작성하고, 일반 코딩은 lowerCamelCase로 작성해야 합니다.
  - 기존 주석 유지
  - 수정된 내용을 코드 아래 주석으로 남겨야 합니다.
  - 수정 내용:
    - paddiog -> padding (Button 컴포넌트의 오탈자 수정)
*/

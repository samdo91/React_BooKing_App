import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { userDataAtom, loginModals, loginStates } from "../store/global/index";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import LoginPopUp from "../loginPage/loginPopUp";

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
  flex-direction: ${(props) => {
    return props.login === false ? "column" : "row";
  }};
`;

const Button = styled.button`
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  background-color: #f5002d;
  color: white;
  paddiog: 40px;
  margin: 15px;
  width: 100px;
`;

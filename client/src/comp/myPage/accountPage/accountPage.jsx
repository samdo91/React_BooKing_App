import React, { useEffect } from "react";
import Header from "../../header/header";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import {
  userDataAtom,
  loginModals,
  loginStates,
} from "../../store/global/index";
import { useAtom } from "jotai";

function AccountPage() {
  /* userData: DB에서 가져온 유저의 데이터 로그인이 되어 있다면 데이터가 있음.(!! 기본 데이터가 있어서 불리언으로 못씀)
loginModal:로그인용 모달을 불러옴 : 불리언 값으로 되어있음
loginState: 로그인 여부. 로그인이 되어 있다면 true
*/
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [loginState, setLoginState] = useAtom(loginStates);
  useEffect(() => {
    if (!loginState) {
      setLoginModal(true);
    }
  }, []);
  return (
    <div>
      <Header />
      <Body>
        <Directory>
          <Link to="/myPage">
            <H1>계정</H1>
          </Link>
          <div>--</div>
          <Link to="/myPage/Account">
            <H1>개인정보</H1>
          </Link>
        </Directory>
        <UserDataContainer>
          <div>{userData.name} </div>
          <div>{userData.email} </div>
          <div>{userData.phoneNumber}</div>
          <div>{userData.countryCode}</div>
        </UserDataContainer>
      </Body>
    </div>
  );
}

export default AccountPage;

const H1 = styled.div`
  font-size: 30px;
`;
const Body = styled.div`
  margin-left: 200px;
  margin-right: 200px;
`;

const Directory = styled.div`
  display: flex;
`;

const UserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

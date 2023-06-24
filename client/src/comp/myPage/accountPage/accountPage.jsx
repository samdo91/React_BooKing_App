import React, { useEffect } from "react";
import Header from "../../Header/Header";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import {
  userDataAtom,
  loginModals,
  loginStates,
} from "../../../Store/Global/Index";
import MyPageCard from "../MyPageCard/MyPageCard";
import { useAtom } from "jotai";

function AccountPage() {
  /* userData: DB에서 가져온 유저의 데이터 로그인이 되어 있다면 데이터가 있음.(!! 기본 데이터가 있어서 불리언으로 못씀)
loginModal:로그인용 모달을 불러옴 : 불리언 값으로 되어있음
loginState: 로그인 여부. 로그인이 되어 있다면 true
*/
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [loginState, setLoginState] = useAtom(loginStates);

  const MyPageList = [
    {
      name: "개인정보",
      introduction: " 개인정보 및 연락처를 알려주세요",
      to: "/myPage/Account/privacy",
    },
    {
      name: "로그인 및 보안 ",
      introduction: "비밀번호를 번경하고 계정을 안전하게",
      to: "",
    },
    { name: "블라블라", introduction: "자리 채우기", to: "" },
    { name: "블라블리", introduction: "자리채우기", to: "" },
    { name: "블라블라", introduction: "자리 채우기", to: "" },
    { name: "블라블리", introduction: "자리채우기", to: "" },
    { name: "블라블라", introduction: "자리 채우기", to: "" },
    { name: "블라블리", introduction: "자리채우기", to: "" },
  ];

  useEffect(() => {
    if (!loginState) {
      setLoginModal(true);
    }
  }, []);
  return (
    <AccountPageContainer>
      <Header />
      <Body>
        <Link to="/myPage">
          <H1>마이페이지</H1>
        </Link>
        <div>--</div>
        <Link to="/myPage/Account">
          <H1>계정</H1>
        </Link>
        <span>
          {userData.name}, {userData.email} 프로필로 이동
        </span>
        <AccountPageBody>
          {MyPageList.map((item) => {
            return (
              <Link to={item.to}>
                <MyPageCard name={item.name} introduction={item.introduction} />
              </Link>
            );
          })}
        </AccountPageBody>
      </Body>
    </AccountPageContainer>
  );
}
/* userData: DB에서 가져온 유저의 데이터 로그인이 되어 있다면 데이터가 있음.(!! 기본 데이터가 있어서 불리언으로 못씀)
loginModal:로그인용 모달을 불러옴 : 불리언 값으로 되어있음
loginState: 로그인 여부. 로그인이 되어 있다면 true
*/

export default AccountPage;
const AccountPageContainer = styled.div``;

const AccountPageBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 100px;
`;

const H1 = styled.div`
  font-size: 30px;
`;

const Body = styled.div`
  margin-left: 200px;
  margin-right: 200px;
`;

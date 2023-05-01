import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { userDataAtom, loginModals, loginStates } from "../store/global/index";
import styled from "@emotion/styled";
import MyPageCard from "./myPageCard/myPageCard";
import { Link } from "react-router-dom";
import Header from "../header/header";
import LoginPopUp from "../loginPage/loginPopUp";
import LoginAdvicePage from "../loginAdvicePage/loginAdvicePage";

function MyPage() {
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
      introduction: " 개인정보 및 연락처를 등록하고 관리하세요.",
      to: "/myPage/Account",
    },
    {
      name: "예약 상황 ",
      introduction: "내가 예약한 숙소를 확인해보세요.",
      to: "",
    },
    {
      name: "acommodatons",
      introduction: "숙박 업소를 등록해보자",
      to: "/myPage/Acommodaton ",
    },
  ];

  useEffect(() => {
    if (!loginState) {
      setLoginModal(true);
    }
  }, []);
  return (
    <>
      <Header />
      {userData.login === false ? (
        <LoginAdvicePage />
      ) : (
        <MyPageContainer>
          <Body>
            <Link to="/myPage">
              <H1>마이 페이지</H1>
            </Link>
            <span>
              {userData.name}, {userData.email}
            </span>
            <MyPageBody>
              {MyPageList.map((item) => {
                return (
                  <Link to={item.to}>
                    <MyPageCard
                      name={item.name}
                      introduction={item.introduction}
                    />
                  </Link>
                );
              })}
            </MyPageBody>
          </Body>
        </MyPageContainer>
      )}
    </>
  );
}

export default MyPage;

const MyPageContainer = styled.div``;

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

const H1 = styled.div`
  font-size: 30px;
`;

const Body = styled.div`
  margin-left: 200px;
  margin-right: 200px;
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

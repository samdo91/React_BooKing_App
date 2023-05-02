import React, { useEffect, useState } from "react";
import Header from "../../header/header";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import {
  userDataAtom,
  loginModals,
  loginStates,
} from "../../store/global/index";
import { Link } from "react-router-dom";
import axios from "axios";
import LoginAdvicePage from "../../loginAdvicePage/loginAdvicePage";
import MyBookingList from "./myBookingList/myBookingList";
function BookingPage() {
  /* userData: DB에서 가져온 유저의 데이터 로그인이 되어 있다면 데이터가 있음.(!! 기본 데이터가 있어서 불리언으로 못씀)
loginModal:로그인용 모달을 불러옴 : 불리언 값으로 되어있음
loginState: 로그인 여부. 로그인이 되어 있다면 true
*/
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [loginState, setLoginState] = useAtom(loginStates);
  const [myBookingList, setMyBookingList] = useState("");

  // 서버에 나의 id로 되어 있는 애어비앤비를 데이터 받아옴
  const myBookingFetchData = async () => {
    const response = await axios.post("http://127.0.0.1:4000/myBooking");
    setMyBookingList([...response.data]);
  };
  // 렌더링될 때 나의 id로 되어 있는 애어비앤비를 데이터를 찾아와서 렌더링
  useEffect(() => {
    myBookingFetchData();
  }, []);

  useEffect(() => {
    if (!loginState) {
      setLoginModal(true);
    }
  }, []);

  return (
    <bookingPageContainer>
      <Header />
      {userData.login === false ? (
        <LoginAdvicePage />
      ) : (
        <Body>
          <Directory>
            <Link to="/myPage">
              <H1>마이페이지</H1>
            </Link>
            <div>--</div>
            <Link to="/myPage/booking">
              <H1>예약 상황</H1>
            </Link>
          </Directory>
          {myBookingList ? <MyBookingList listData={myBookingList} /> : ""}
        </Body>
      )}
    </bookingPageContainer>
  );
}

export default BookingPage;

const bookingPageContainer = styled.div``;

const Body = styled.div`
  margin-left: 200px;
  margin-right: 200px;
`;

const H1 = styled.div`
  font-size: 30px;
`;
const Directory = styled.div`
  display: flex;
`;

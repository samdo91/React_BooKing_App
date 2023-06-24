import React, { useEffect, useState } from "react";
import Header from "../../header/header";
import { useAtom } from "jotai";
import {
  userDataAtom,
  loginModals,
  loginStates,
  addPages,
} from "../../store/global/index";
import styled from "@emotion/styled";
import { Link, Outlet } from "react-router-dom";
import MyAcommodatonList from "./myAcommodatonList/myAcommodatonList";

import axios from "axios";
import LoginAdvicePage from "../../loginAdvicePage/loginAdvicePage";

function AcommodatonPage() {
  /* userData: DB에서 가져온 유저의 데이터 로그인이 되어 있다면 데이터가 있음.(!! 기본 데이터가 있어서 불리언으로 못씀)
loginModal:로그인용 모달을 불러옴 : 불리언 값으로 되어있음
loginState: 로그인 여부. 로그인이 되어 있다면 true
*/
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [loginState, setLoginState] = useAtom(loginStates);
  const [addPage, setAddPage] = useAtom(addPages);
  const [myAcommodatonList, setMyAcommodatonList] = useState("");

  // 서버에 나의 id로 되어 있는 애어비앤비를 데이터 받아옴
  const myAcommodatonFetchData = async () => {
    const response = await axios.post("http://127.0.0.1:4000/myAcommodaton");
    setMyAcommodatonList([...response.data]);
  };
  // 렌더링될 때 나의 id로 되어 있는 애어비앤비를 데이터를 찾아와서 렌더링
  useEffect(() => {
    myAcommodatonFetchData();
  }, []);

  // useEffect(() => {
  //   if (loginState === false) {
  //     setLoginModal(true);
  //   }
  // }, []);

  return (
    <div>
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
            <Link to="/myPage/Account">
              <H1>숙소 등록</H1>
            </Link>
          </Directory>
          {myAcommodatonList ? (
            <MyAcommodatonList listData={myAcommodatonList} />
          ) : (
            ""
          )}

          {addPage ? (
            <Outlet />
          ) : (
            <AddButtonSection>
              <p>
                자신이 가진 에어비앤비를 등록하고 싶다면 이 버튼을 누르세요.{" "}
              </p>
              <Link to="/myPage/Acommodaton/add">
                <AddButton
                  onClick={() => {
                    setAddPage(true);
                  }}
                >
                  add Acommodato
                </AddButton>
              </Link>
            </AddButtonSection>
          )}
        </Body>
      )}
    </div>
  );
}

export default AcommodatonPage;

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

const AddButtonSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const AddButton = styled.button`
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  background-color: #f5002d;
  color: white;
  paddiog: 20px; //@NOTE 오탈자
  margin: 15px;
`;

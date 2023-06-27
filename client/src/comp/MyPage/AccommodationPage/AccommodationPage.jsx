import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import { useAtom } from "jotai";
import {
  userDataAtom,
  loginModals,
  loginStates,
  addPages,
} from "../../../Store/Global/Index";
import styled from "@emotion/styled";
import { Link, Outlet } from "react-router-dom";
import MyAccommodationList from "./MyAccommodationList/MyAccommodationList";

import axios from "axios";
import LoginAdvicePage from "../../LoginAdvicePage/LoginAdvicePage";

function AccommodationPage() {
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [loginState, setLoginState] = useAtom(loginStates);
  const [addPage, setAddPage] = useAtom(addPages);
  const [myAccommodationList, setMyAccommodationList] = useState("");

  const myAccommodationFetchData = async () => {
    const response = await axios.post("http://127.0.0.1:4000/myAccommodation");
    setMyAccommodationList([...response.data]);
  };

  useEffect(() => {
    myAccommodationFetchData();
  }, []);

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
          {myAccommodationList ? (
            <MyAccommodationList listData={myAccommodationList} />
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
              <Link to="/myPage/MyAccommodation/add">
                <AddButton
                  onClick={() => {
                    setAddPage(true);
                  }}
                >
                  add Accommodation
                </AddButton>
              </Link>
            </AddButtonSection>
          )}
        </Body>
      )}
    </div>
  );
}

export default AccommodationPage;

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
  padding: 20px;
  margin: 15px;
`;

import React from "react";
import Header from "../Header/Header";
import LoginPopUp from "../LoginPage/LoginPopUp";
import { useAtom } from "jotai";
import { loginModals } from "../../Store/Global/Index";
import MainPageHeader from "./MainPageHeader/MainPageHeader";
import MainPageBoard from "./MainPageBoard/MainPageBoard";
import styled from "@emotion/styled";

function MainPage() {
  const [loginModal, setLoginModal] = useAtom(loginModals);

  return (
    <Div>
      <Header />
      <MainPageHeader />
      {loginModal ? <LoginPopUp /> : ""}
      <MainPageBoard />
    </Div>
  );
}

export default MainPage;

const Div = styled.div`
  margin-left: 60px;
  margin-right: 60px;
`;

import React from "react";
import Header from "../header/header";
import LoginPopUp from "../loginPage/loginPopUp";
import { useAtom } from "jotai";
import { loginModals } from "../store/global/index";
import MainPageHeader from "./mainPageHeader/mainPageHeader";
import MainPageBoard from "./mainPageBoard/mainPageBoard";
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

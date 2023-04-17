import React from "react";
import Header from "../header/header";
import LoginPopUp from "../loginPage/loginPopUp";
import { useAtom } from "jotai";
import { loginModals } from "../store/global/index";
import MainPageHeader from "./mainPageHeader/mainPageHeader";
import MainPageBoard from "./mainPageBoard/mainPageBoard";

function MainPage() {
  const [loginModal, setLoginModal] = useAtom(loginModals);
  return (
    <div>
      <Header />
      <MainPageHeader />
      {loginModal ? <LoginPopUp /> : ""}
      <MainPageBoard />
    </div>
  );
}

export default MainPage;

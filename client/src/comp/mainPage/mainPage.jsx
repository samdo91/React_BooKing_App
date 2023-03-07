import React from "react";
import Header from "../header/header";
import LoginPopUp from "../loginPage/loginPopUp";
import { useAtom } from "jotai";
import { loginModals } from "../store/global/index";

function MainPage() {
  const [loginModal, setLoginModal] = useAtom(loginModals);
  return (
    <div>
      <Header />
      {loginModal ? <LoginPopUp /> : ""}
    </div>
  );
}

export default MainPage;

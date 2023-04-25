import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { SlMenu } from "react-icons/sl";
import { FiUser } from "react-icons/fi";
import {
  loginMenuToggles,
  userDataAtom,
  loginStates,
} from "../../store/global";
import { useAtom } from "jotai";
import axios from "axios";
import LoginMenuBox from "./loginMenuBox/loginMenuBox";

function LoginMenu() {
  const [loginMenuToggle, setLoginMenuToggle] = useAtom(loginMenuToggles);
  const [userDatas, setUserData] = useAtom(userDataAtom);
  const [loginState, setLoginState] = useAtom(loginStates);

  //쿠키가 있나 없나 검증하며 있다면 쿠키를 불러온다.
  const logincookie = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:4000/profile`);

      if (response.data === false) {
        return;
      } else {
        setUserData({ login: true, token: true, ...response.data });
        console.log("토큰 있음", response.data);
      }
    } catch (e) {
      ("어딘가 갔어");
    }

    return response.data;
  };

  useEffect(() => {
    if (userDatas.token === false) {
      const response = logincookie();
    }
  }, []);

  useEffect(() => {
    if (userDatas.login) {
      setLoginState(true);
      console.log(userDatas);
    }
  }, [userDatas]);

  const toggleLoginMenu = () => {
    if (loginMenuToggle === false) {
      setLoginMenuToggle(true);
    } else setLoginMenuToggle(false);
  };
  return (
    <LoginMenus>
      <LoginMenuIcon onClick={toggleLoginMenu} userData={userDatas.login}>
        <SlMenus />
        <FiUsers userData={loginState} />
        {loginState === true ? <Namespan>{userDatas.name}</Namespan> : ""}
      </LoginMenuIcon>

      {loginMenuToggle === true ? <LoginMenuBox /> : ""}
    </LoginMenus>
  );
}

export default LoginMenu;
const LoginMenus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-right: 20px;
`;

const LoginMenuIcon = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e9e9e9;
  border-radius: 15px;
  width: ${(props) => {
    return props.userData === true ? "100px" : "40px";
  }};
  height: 30px;
  justify-content: space-around;
  box-shadow: 0.5px 0.5px 00 #c0c0c0;
`;

const SlMenus = styled(SlMenu)`
  font-size: 15px;
`;

const FiUsers = styled(FiUser)`
  font-size: 20px;
  border-radius: 10px;
  color: white;
  width: 20px;
  height: 20px;
  background-color: ${(props) => {
    return props.userData === true ? "red" : "gray";
  }};
`;
const Namespan = styled.span`
  font-size: 15px;
`;

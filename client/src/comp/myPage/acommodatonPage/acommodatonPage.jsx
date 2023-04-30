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
import {
  AiOutlineCloudUpload,
  AiOutlineWifi,
  AiOutlineCar,
} from "react-icons/ai";
import axios from "axios";

function AcommodatonPage() {
  /* userData: DB에서 가져온 유저의 데이터 로그인이 되어 있다면 데이터가 있음.(!! 기본 데이터가 있어서 불리언으로 못씀)
loginModal:로그인용 모달을 불러옴 : 불리언 값으로 되어있음
loginState: 로그인 여부. 로그인이 되어 있다면 true
*/
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [loginState, setLoginState] = useAtom(loginStates);
  const [addPage, setAddPage] = useAtom(addPages);

  useEffect(() => {
    if (!loginState) {
      setLoginModal(true);
    }
  }, []);

  return (
    <div>
      <Header />
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
        {addPage ? (
          <Outlet />
        ) : (
          <Link to="/myPage/Acommodaton/add">
            <SaveButton
              onClick={() => {
                setAddPage(true);
              }}
            >
              add Acommodato
            </SaveButton>
          </Link>
        )}
      </Body>
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

const Input = styled.input`
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px gray;
  border: 1px solid #dcdcdc;
  margin: 15px;
  width: 800px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px;
  justify-content: flex-start;
`;

const H2 = styled.div`
  font-size: 25px;
  margin: 20px;
`;

const PhotoLabel = styled.label`
  display: flex;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  width: 300px;
  height: 150px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  flex-direction: column;
  background-color: white;
`;
const PhotoInput = styled.input`
  ::file-selector-button {
    display: none;
  }
`;

const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const PhotoLink = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PhotoLinkButton = styled.button`
  border-radius: 10px;
  width: 90px;
  background-color: #ff59b3;
  justify-content: center;
  height: 30px;
`;

const PhotoZone = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 15px;
`;

const PhotoZoneBorad = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 330px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  align-items: center;
`;

const SamplePhotos = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  margin: 15px;
`;

const CheckInSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckInput = styled.input`
  display: flex;
  border: 1px solid #dcdcdc;
  height: 50px;
  width: 300px;
  border-radius: 10px;
  margin: 10px;
`;

const SaveButton = styled.button`
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  background-color: #f5002d;
  color: #dcdcdc;
`;

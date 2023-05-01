import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { itemDatas } from "../store/global";
import Header from "../header/header";
import { loginModals } from "../store/global";
import axios from "axios";
import LoginPopUp from "../loginPage/loginPopUp";
import styled from "@emotion/styled";
function DetailPage() {
  //useParams를 사용할때 넘겨준 인자와 같은 인자를 가져와야한다. props라고 생각하면 편함
  let { id } = useParams();
  const [itemData] = useAtom(itemDatas);
  const [detailData, setDetailData] = useState([]);
  const [loginModal, setLoginModal] = useAtom(loginModals);

  const itemSearch = async () => {
    const response = await axios.post(`http://127.0.0.1:4000/detailPage`, {
      id: id,
    });
    const Acommodaton = response.data;
    console.log(Acommodaton);
    setDetailData({ ...Acommodaton });
  };

  useEffect(() => {
    itemSearch();
  }, []);

  console.log(detailData);
  return (
    <DetailPageContainer>
      <Header search />
      {loginModal ? <LoginPopUp /> : ""}

      <div> {detailData.hostName}</div>
      <div> {detailData.country} </div>
      <div> {detailData.city}</div>
      <div> {detailData.type} </div>
      <div> {detailData.price}</div>
      <button
        onClick={() => {
          setLoginModal(true);
        }}
      >
        모달 창 열기
      </button>
    </DetailPageContainer>
  );
}

export default DetailPage;

const DetailPageContainer = styled.div`
  margin-left: 300px;
  margin-right: 300px;
`;

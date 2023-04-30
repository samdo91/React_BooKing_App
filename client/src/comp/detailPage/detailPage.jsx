import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { itemDatas } from "../store/global";
import axios from "axios";
function DetailPage() {
  //useParams를 사용할때 넘겨준 인자와 같은 인자를 가져와야한다. props라고 생각하면 편함
  let { id } = useParams();
  const [itemData] = useAtom(itemDatas);
  const [detailData, setDetailData] = useState([]);

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
    <div>
      <div> {detailData.hostName}</div>
      <div> {detailData.country} </div>
      <div> {detailData.city}</div>
      <div> {detailData.type} </div>
      <div> {detailData.price}</div>
    </div>
  );
}

export default DetailPage;

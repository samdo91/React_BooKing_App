import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { itemDatas } from "../store/global";
function DetailPage() {
  //useParams를 사용할때 넘겨준 인자와 같은 인자를 가져와야한다. props라고 생각하면 편함
  let { hostName } = useParams();
  const [itemData] = useAtom(itemDatas);
  const [detailData, setDetailData] = useState([]);

  const itemSearch = () => {
    // const findItem = itemData.find((item) => {
    //   item.hostName === hostName;
    // });
    const findItem = itemData.filter((item) => {
      return item.hostName === hostName;
    });

    setDetailData(...findItem);
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

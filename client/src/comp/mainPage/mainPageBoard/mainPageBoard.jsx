import React, { useEffect, useState } from "react";
import axios from "axios";
import BoardItemCard from "./boardItemCard/boardItemCard";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { itemDatas } from "../../store/global";
import { Link } from "react-router-dom";

function MainPageBoard() {
  /* country: 나라, 
  city: 도시, 
  hostName: 집주인, 
  picture: 사진, 
  price: 1박당 가격, 
  type: 해더부분의 검색에 이용*/
  const [itemData, setItemData] = useAtom(itemDatas);

  const itemDataFuntion = async () => {
    const response = await axios.get(`http://127.0.0.1:4000/address`);
    const itemDatas = response.data;
    setItemData(itemDatas);
    return itemDatas;
  };
  useEffect(() => {
    itemDataFuntion();
  }, []);

  return (
    <Div>
      {itemData.map((item) => {
        const hostName = item.hostName;

        return (
          <Link to={`/${hostName}`}>
            <BoardItemCard
              key={item.price}
              country={item.country}
              city={item.city}
              hostName={item.hostName}
              picture={item.picture}
              price={item.price}
              type={item.type}
            />
          </Link>
        );
      })}
    </Div>
  );
}

export default MainPageBoard;

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

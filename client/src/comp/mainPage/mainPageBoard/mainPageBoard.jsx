import React, { useEffect, useState } from "react";
import axios from "axios";
import BoardItemCard from "./boardItemCard/boardItemCard";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { itemDatas, zoroItems, itemDataLists } from "../../store/global";
import { Link } from "react-router-dom";

function MainPageBoard() {
  /* country: 나라, 
  city: 도시, 
   picture: 사진, 
  price: 1박당 가격, 
  type: 해더부분의 검색에 이용
   hostName: 집주인, */
  const [itemData, setItemData] = useAtom(itemDatas);
  const [itemDataList, setItemDataList] = useAtom(itemDataLists);
  const [zoroItem, setZoroItem] = useAtom(zoroItems);

  const itemDataFuntion = async () => {
    const response = await axios.post(`http://127.0.0.1:4000/mainacommodaton`);

    const itemDatas = response.data;
    setItemData(itemDatas);
    setItemDataList(itemDatas);
    return itemDatas;
  };
  useEffect(() => {
    itemDataFuntion();
  }, []);

  return zoroItem ? (
    <div> 조건에 맞는 에어비앤비가 준비되지 않았어요 </div>
  ) : (
    <Div>
      {itemDataList.map((item) => {
        const hostName = item.hostName;

        return (
          <Link to={`detailPage/${item._id}`} key={item._id}>
            <BoardItemCard
              country={item.country}
              city={item.city}
              hostName={item.hostName}
              picture={item.photos?.[0]}
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

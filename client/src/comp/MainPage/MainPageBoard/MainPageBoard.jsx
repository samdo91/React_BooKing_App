import React, { useEffect } from "react";
import axios from "axios";
import BoardItemCard from "./BoardItemCard/BoardItemCard";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import {
  itemDatas,
  zoroItems,
  itemDataLists,
} from "../../../Store/Global/Index";
import { Link } from "react-router-dom";
const PROXY =
  window.location.hostname === "localhost" ? "http://127.0.0.1:4000" : "/proxy";

function MainPageBoard() {
  // itemData: 아이템 데이터,
  // itemDataList: 아이템 데이터 목록,
  // zoroItem: 조건에 맞는 에어비앤비가 없는 경우,
  const [itemData, setItemData] = useAtom(itemDatas);
  const [itemDataList, setItemDataList] = useAtom(itemDataLists);
  const [zoroItem, setZoroItem] = useAtom(zoroItems);

  // 아이템 데이터를 가져오는 비동기 함수
  const fetchItemData = async () => {
    try {
      const response = await axios.post(`${PROXY}/mainAccommodation`);
      const fetchedItemData = response.data;
      setItemData(fetchedItemData);
      setItemDataList(fetchedItemData);
    } catch (error) {
      console.error(
        "아이템 데이터를 가져오는 중에 오류가 발생했습니다:",
        error
      );
      setZoroItem(true);
    }
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  return zoroItem ? (
    <div>조건에 맞는 에어비앤비가 준비되지 않았어요</div>
  ) : (
    <Container>
      {itemDataList.map((item) => (
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
      ))}
    </Container>
  );
}

export default MainPageBoard;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

/* itemDataFuntion 함수명을 fetchItemData로 변경하여 함수의 역할을 명확히 표현하였습니다.
Div 컴포넌트를 Container로 이름 변경하여 의미에 맞는 이름을 사용하였습니다.
수정된 내용은 주석으로 표시되어 있습니다. */

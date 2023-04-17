import React, { useEffect, useState } from "react";
import axios from "axios";
import BoardItemCard from "./boardItemCard/boardItemCard";

function MainPageBoard() {
  const [itemData, setItemData] = useState([]);

  const itemDataFuntion = async () => {
    const response = await axios.get(`http://127.0.0.1:4000/address`);
    const itemDatas = response.data;
    setItemData(itemDatas);
    return itemDatas;
  };
  useEffect(() => {
    itemDataFuntion();
    console.log(itemData);
  }, []);

  console.log(itemData);
  return (
    <div>
      {itemData.map((item) => {
        return (
          <BoardItemCard
            country={item.country}
            city={item.city}
            hostName={item.hostName}
            picture={item.picture}
            price={item.price}
            type={item.type}
          />
        );
      })}
    </div>
  );
}

export default MainPageBoard;

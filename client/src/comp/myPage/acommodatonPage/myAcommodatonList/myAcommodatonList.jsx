import styled from "@emotion/styled";
import React from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import { useAtom } from "jotai";
import { addPages } from "../../../store/global";
import axios from "axios";
import { Link } from "react-router-dom";

function MyAcommodatonList(props) {
  const { listData } = props;
  const [addPage, setAddPage] = useAtom(addPages);

  const detailFixButton = async (e) => {
    const itemId = e.target.id;
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/detailFixAcommodaton",
        {
          id: itemId,
        }
      );
      const myAcommodaton = response.data[0];

      setAddPage(true);
    } catch (error) {
      console.error("id가 없은 토큰이 없거나 로그인이 안되어 있음");
      // 에러 메시지를 사용자에게 알려줄 수 있는 방법을 구현해주세요.
    }
  };
  return (
    <MyListBox>
      {listData.map((itemList) => {
        return (
          <ItemBox>
            <ItemPhotos src={itemList.photos[0]} />
            <Flex>
              <ItemData>
                <div> 숙소명: {itemList.title} </div>
                <div>
                  주소: {itemList.city} , {itemList.address} ,{itemList.country}
                </div>
                <div> 요금: {itemList.price} </div>
                <PerksDiv>
                  perks:
                  {itemList.perks.map((item) => {
                    return <Item> {item} </Item>;
                  })}
                </PerksDiv>
                <PerksDiv>
                  type:
                  {itemList.type.map((item) => {
                    return <Item> {item} </Item>;
                  })}
                </PerksDiv>
              </ItemData>
              <label>
                <Link to="/myPage/Acommodaton/add">
                  <Button id={itemList._id} onClick={detailFixButton}>
                    <FiArrowRightCircle /> 수정 및 세부 사항
                  </Button>
                </Link>
              </label>
            </Flex>
          </ItemBox>
        );
      })}
    </MyListBox>
  );
}

export default MyAcommodatonList;

const MyListBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemBox = styled.div`
  display: flex;
  margin: 15px;
  border-radius: 10px;
  border: 1px solid #dcdcdc;
  height: 280px;
  align-items: center;
  justify-content: space-between;
`;

const ItemPhotos = styled.img`
  width: 250px;
  height: 240px;
  margin: 10px;
  border-radius: 10px;
`;

const Flex = styled.div`
  display: flex;
`;

const ItemData = styled.div`
  font-size: 25px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  align-content: flex-start;
`;

const PerksDiv = styled.div`
  display: flex;
`;
const Item = styled.div`
  margin-left: 10px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  height: 280px;
  width: 250px;
  :hover {
    background-color: #dcdcdc;
  }
`;

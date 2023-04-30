import styled from "@emotion/styled";
import React from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import { addPages } from "../../../store/global";
import { useAtom } from "jotai";
import axios from "axios";
import { Link } from "react-router-dom";

function MyAcommodatonList(props) {
  const { listData } = props;
  const [addPage, setAddPage] = useAtom(addPages);

  return (
    <MyListBox>
      {listData.map((itemList) => {
        return (
          <ItemBox key={itemList._id}>
            <ItemPhotosWrapper>
              <ItemPhotos src={`http://127.0.0.1:4000/${itemList.photos[0]}`} />
            </ItemPhotosWrapper>

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
                <Link to={`/myPage/Acommodaton/add/${itemList._id}`}>
                  <Button
                    onClick={() => {
                      console.log(itemList._id);
                      setAddPage(true);
                    }}
                  >
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
  justify-content: space-between; // ItemBox 내의 Flexbox 내용물을 좌우로 정렬
`;

const ItemPhotos = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const ItemPhotosWrapper = styled.div`
  width: 300px;
  height: 250px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%; // Flex 컴포넌트가 ItemBox의 너비를 100%로 채우도록 함
`;

const ItemData = styled.div`
  font-size: 25px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1; // ItemData 컴포넌트가 Flexbox 내에서 더 많은 공간을 차지하도록 함
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

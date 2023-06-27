import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FiArrowRightCircle } from "react-icons/fi";

function MyBookingList(props) {
  const { listData } = props;

  return (
    <MyListBox>
      {listData.map((item) => {
        return (
          <ItemBox key={item._id}>
            <ItemPhotosWrapper>
              <ItemPhotos
                src={`${import.meta.env.PROXY_SERVER}/${item.place.photos[0]}`}
              />
            </ItemPhotosWrapper>
            <Body>
              <div>
                <H1>
                  <b>{item.place.title}</b>
                </H1>
                <AddressDiv>
                  {item.place.address} , {item.place.city} ,{" "}
                  {item.place.country}
                  <div>
                    {format(new Date(item.checkIn), "yyyy-MM-dd")} ~{" "}
                    {format(new Date(item.checkOut), "yyyy-MM-dd")}{" "}
                  </div>
                  <div> 투숙객 : {item.guests} 명 </div>
                  <div> 숙박일수: {item.numberOfNight} 일</div>
                  <div> 총 숙박비용: ₩ {item.prices.toLocaleString()} </div>
                  <div>{item.place._id}</div>
                </AddressDiv>
              </div>
              <div>
                <Link to={`/detailPage/${item.place._id}`}>
                  <Button>
                    <FiArrowRightCircle /> 자세하게 하게 보기
                  </Button>
                </Link>
              </div>
            </Body>
          </ItemBox>
        );
      })}
    </MyListBox>
  );
}

export default MyBookingList;

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
  //   justify-content: space-between; // ItemBox 내의 Flexbox 내용물을 좌우로 정렬
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

const AddressDiv = styled.div`
  margin: 10px;
`;

const H1 = styled.h1`
  font-size: 30px;
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

const Body = styled.div`
  display: flex;
  width: 78%;
  justify-content: space-between;
`;

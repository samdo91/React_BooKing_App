import styled from "@emotion/styled";
import React from "react";

const PROXY =
  window.location.hostname === "localhost" ? "http://127.0.0.1:4000" : "/proxy";

function BoardItemCard(props) {
  const { country, city, hostName, picture, price, type } = props;

  return (
    <CardBox>
      <Image src={`${PROXY}/${picture}`} />
      <div>
        <b>{city}</b> <b>{country}</b>
        <div>
          {type.map((item) => {
            return <StyledSpan key={item}>{item}</StyledSpan>;
          })}
        </div>
        <div>₩ {parseInt(price).toLocaleString()}/ 박</div>
      </div>
    </CardBox>
  );
}

export default BoardItemCard;

// CardBox 컴포넌트 스타일
const CardBox = styled.div`
  display: flex;
  width: 270px;
  height: 320px;
  margin: 10px;
  flex-direction: column;
`;

// Image 컴포넌트 스타일
const Image = styled.img`
  width: 260px;
  height: 250px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

// StyledSpan 컴포넌트 스타일
const StyledSpan = styled.span`
  margin-right: 10px;
`;

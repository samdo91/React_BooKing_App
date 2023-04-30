import styled from "@emotion/styled";
import React from "react";
function BoardItemCard(props) {
  const { country, city, hostName, picture, price, type } = props;

  return (
    <CardBox>
      <Image src={`http://127.0.0.1:4000/${picture}`} />
      <div>
        <b>{city}</b> <b>{country}</b>
        <div>
          {type.map((item) => {
            return <Span>{item}</Span>;
          })}
        </div>
        <div>₩ {price}/ 박</div>
      </div>
    </CardBox>
  );
}

export default BoardItemCard;

const CardBox = styled.div`
  display: flex;
  width: 270px;
  height: 320px;
  margin: 10px;
  flex-direction: column;
`;

const Image = styled.img`
  width: 260px;
  height: 250px;

  justify-content: center;
  align-items: center;
`;

const Span = styled.span`
  margin-right: 10px;
`;

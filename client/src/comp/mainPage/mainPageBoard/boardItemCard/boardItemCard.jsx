import styled from "@emotion/styled";
import React from "react";
function BoardItemCard(props) {
  const { country, city, hostName, picture, price, type } = props;

  return (
    <CardBox>
      <Image src={picture} />
      <div>
        <b>{city}</b> <b>{country}</b>
        <div>
          {type.map((item) => {
            return <span>{item}</span>;
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
  height: 300px;
  border: 1px solid #e9e9e9;
  margin: 10px;
  flex-direction: column;
`;

const Image = styled.img`
  width: 260px;
  height: 200px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;s
`;

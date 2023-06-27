import styled from "@emotion/styled";
import React from "react";

function MyPageCard(props) {
  const { name, introduction } = props;

  return (
    <Card>
      <div>
        <b>{name}</b>
      </div>
      <div>{introduction}</div>
    </Card>
  );
}

export default MyPageCard;

const Card = styled.div`
  display: flex;
  width: 300px;
  height: 150px;
  margin: 10px;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #dcdcdc;
  box-shadow: 5px 5px 5px 5px gray;
  justify-content: space-between;
`;

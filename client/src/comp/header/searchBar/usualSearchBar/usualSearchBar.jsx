import React, { useState } from "react";
import styled from "@emotion/styled";
import { BsSearch } from "react-icons/bs";

function UsualSearchBar() {
  const { searchText, setSearchText } = useState("");

  // const searchText = () =>{

  // }
  return (
    <UsualSearchBarContainer>
      <Input
        type="text"
        value={searchText}
        placeholder="검색시작하기"
        onChange={(e) => {
          return setSearchText(e.target.value);
        }}
      />
      <ButtonBox
        onClick={() => {
          alert("아직 이기능을 만들지 못했어");
        }}
      >
        <BsSearchs />
      </ButtonBox>
    </UsualSearchBarContainer>
  );
}

export default UsualSearchBar;

const UsualSearchBarContainer = styled.div`
  display: flex;
  width: 400px;
  border: 1px solid #dcdcdc;
  border-radius: 15px;
  height: 30px;
  margin-left: 200px;
  box-shadow: 1px 1px 1px 1px #c0c0c0;
`;
const Input = styled.input`
  width: 350px;
  height: 100%;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5002d;
  width: 25px;
  height: 25px;
  border-radius: 25px;
`;

const BsSearchs = styled(BsSearch)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

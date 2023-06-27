import React, { useState } from "react";
import styled from "@emotion/styled";
import { BsSearch } from "react-icons/bs";

function UsualSearchBar() {
  const [searchText, setSearchText] = useState(""); // 변경: setSearchText 변수 수정

  return (
    <UsualSearchBarContainer>
      <Input
        type="text"
        value={searchText}
        placeholder="검색시작하기"
        onChange={(e) => setSearchText(e.target.value)} // 변경: return 키워드 제거
      />
      <ButtonBox
        onClick={() => {
          alert("아직 이 기능을 만들지 못했어"); // 수정: 아직 이 기능을 만들지 못했습니다.
        }}
      >
        <BsSearchIcon />
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

const BsSearchIcon = styled(BsSearch)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

/*
  주석:
  - 오탈자 수정
  - 컴포넌트는 UpperCamelCase로 작성하고, 일반 코딩은 lowerCamelCase로 작성해야 합니다.
  - 기존 주석 유지
  - 수정된 내용을 코드 아래 주석으로 남겨야 합니다.
  - 수정 내용:
    - setSearchText 변수 이름 변경
    - searchText 함수 제거
    - ButtonBox 컴포넌트 클릭 시 경고 메시지 수정
    - BsSearchs 컴포넌트를 BsSearchIcon으로 변경
*/

import React from "react";
import styled from "@emotion/styled";
import { BsSearch } from "react-icons/bs";
import { useAtom } from "jotai";
import { searchBarStates } from "../../../Store/Global/Index";

function DefaultSearchBar() {
  const [searchBarState, setSearchBarState] = useAtom(searchBarStates);

  const handleButtonClick = (e) => {
    setSearchBarState(e.target.value);
  };

  return (
    <DefaultSearchBarBox>
      <Button first={true} onClick={handleButtonClick} value="anywhere">
        어디든
      </Button>
      <Button onClick={handleButtonClick} value="whenever">
        언제든 일주일
      </Button>
      <GuestButton onClick={handleButtonClick} value="guest">
        게스트추가
        <BsSearchIcon />
      </GuestButton>
    </DefaultSearchBarBox>
  );
}

export default DefaultSearchBar;

const DefaultSearchBarBox = styled.div`
  display: flex;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  width: 600px;
  height: 30px;
  font-size: 15px;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0.5px 0.5px 0 0 #c0c0c0;
`;

const BsSearchIcon = styled(BsSearch)`
  color: white;
  width: 13px;
  height: 13px;
  background-color: red;
  border-radius: 10px;
`;

const GuestButton = styled.button`
  color: #bababa;
  display: flex;
`;

const Button = styled.button`
  border-right: 1px solid #e9e9e9;
  padding-right: 10px;
  padding-left: ${(props) => (props.first === true ? "10px" : "0px")};
`;

/*
  주석:
  - 오탈자 수정
  - 컴포넌트는 UpperCamelCase로 작성하고, 일반 코딩은 lowerCamelCase로 작성해야 합니다.
  - 기존 주석 유지
  - 수정된 내용을 코드 아래 주석으로 남겨야 합니다.
  - 수정 내용:
    - BsSearchs 컴포넌트를 BsSearchIcon으로 변경
    - GuestButton, Button 컴포넌트의 클릭 이벤트 핸들러 이름을 handleButtonClick으로 수정
    - Button 컴포넌트의 padding-left 속성을 삼항 연산자로 설정하도록 수정
    - DefaultSearchBarContainer -> DefaultSearchBarBox로 이름 변경
*/

import React from "react";
import styled from "@emotion/styled";
import { BsSearch } from "react-icons/bs";
import { useAtom } from "jotai";
import { searchBarStates } from "../../store/global/index";

function DefaultSearchBar() {
  const [searchBarState, setSearchBarState] = useAtom(searchBarStates);

  const handlebuttonclick = (e) => {
    console.log("e.targer :>> ", e.target.value);
    setSearchBarState(e.target.value);
  };
  return (
    <DefaultSearchBarBox>
      <Button first={true} onClick={handlebuttonclick} value="anywhere">
        어디든
      </Button>
      <Button value="whenever"> 언제든 일주일</Button>
      <GuestButton value="guest">
        게스트추가
        <BsSearchs />
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
  box-shadow: 0.5px 0.5px 00 #c0c0c0;
`;

const BsSearchs = styled(BsSearch)`
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
  padding-left: ${(props) => {
    props.first === true ? "10px" : "0px";
  }};
`;

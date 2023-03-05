import React from "react";
import { DiAtom } from "react-icons/di";
import styled from "@emotion/styled";
import { BsSearch } from "react-icons/bs";

function Header() {
  return (
    <FooterPage>
      <H1>
        <div>
          <DiAtom />
        </div>
        <span> boking.com</span>
      </H1>
      <SearchButtons>
        <Button>어디든</Button>
        <Button>언제든 일주일</Button>
        <GuestButton>
          게스트추가 <BsSearchs />
          깃이 안됨{" "}
        </GuestButton>
      </SearchButtons>
    </FooterPage>
  );
}

export default Header;

const FooterPage = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const H1 = styled.span`
  display: flex;
  color: red;
  margin: 0px;
`;

const SearchButtons = styled.div`
  display: flex;
  border: 1px solid #e9e9e9;
  border-radius: 10px;
  width: 200px;
  height: 20px;
  font-size: 7px;
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
`;

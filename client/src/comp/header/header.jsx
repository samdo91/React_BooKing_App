import React from "react";
import { DiAtom } from "react-icons/di";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { searchBarStates } from "../store/global/index";
import DefaultSearchBar from "./searchBar/defaultSearchBar";
import AnywhereSearchBar from "./searchBar/anywhereSearchBar/anywhereSearchBar";

function Header() {
  const [searchBarState, setSearchBarState] = useAtom(searchBarStates);
  console.log("searchBarStaet :>> ", searchBarState);
  return (
    <FooterPage>
      <H1>
        <div>
          <DiAtom />
        </div>
        <span> boking.com</span>
      </H1>
      <div>
        {searchBarState === "default" ? (
          <DefaultSearchBar />
        ) : searchBarState === "anywhere" ? (
          <AnywhereSearchBar />
        ) : (
          ""
        )}
      </div>
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

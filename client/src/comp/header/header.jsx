import React, { useState } from "react";
import { DiAtom } from "react-icons/di";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import {
  searchBarStates,
  itemDatas,
  zoroItems,
  itemDataLists,
} from "../store/global/index";
import DefaultSearchBar from "./searchBar/defaultSearchBar";
import AnywhereSearchBar from "./searchBar/anywhereSearchBar/anywhereSearchBar";
import { BiGlobe } from "react-icons/bi";
import LoginMenu from "./loginMenu/loginMenu";
import { Link } from "react-router-dom";
import UsualSearchBar from "./searchBar/usualSearchBar/usualSearchBar";

function Header(props) {
  const { search } = props;
  /* searchBarState: 서치바의 변경에 사용한다. 서치바의 값을 변경하여 디폴트, 웨어, 에니워어로 서치창을 변경
      loginMenuToggle: 로그인메뉴아이콘을 클릭했을 떄 로그인 메뉴의 메뉴를 토글한다.
  */
  const [searchBarState, setSearchBarState] = useAtom(searchBarStates);
  const [itemData, setItemData] = useAtom(itemDatas);
  const [itemDataList, setItemDataList] = useAtom(itemDataLists);
  const [zoroItem, setZoroItem] = useAtom(zoroItems);

  const logoLink = () => {
    setZoroItem(false);
    setItemDataList(itemData);
  };

  return (
    <HeaderPage>
      <H1>
        <div>
          <DiAtom />
        </div>
        <Link to={"/"} onClick={logoLink}>
          <span> boking.com</span>
        </Link>
      </H1>
      {search ? (
        <UsualSearchBar />
      ) : (
        <SearchBar>
          {searchBarState === "default" ? (
            <DefaultSearchBar />
          ) : searchBarState === "anywhere" ? (
            <AnywhereSearchBar />
          ) : (
            ""
          )}
        </SearchBar>
      )}

      <HeaderRight>
        <SellMyAirbnb>당신의 공간을 에어비앤비하세요</SellMyAirbnb>
        <BiGlobes></BiGlobes>
      </HeaderRight>
      <LoginMenu />
    </HeaderPage>
  );
}

export default Header;

const HeaderPage = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  border-bottom: 1px solid #e9e9e9;
  font-size: 20px;
`;

const H1 = styled.span`
  display: flex;
  color: red;
  margin: 0px;
`;

const SearchBar = styled.div`
  margin-left: 250px;
`;
// const SearchButtons = styled.div`
//   display: flex;
//   border: 1px solid #e9e9e9;
//   border-radius: 10px;
//   width: 200px;
//   height: 20px;
//   font-size: 7px;
//   align-items: center;
//   justify-content: space-around;
//   box-shadow: 0.5px 0.5px 00 #c0c0c0;
// `;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: 40px;
  justify-content: flex-end;
  padding-left: 100px;
`;

const SellMyAirbnb = styled.div`
  border-radius: 10px;
  font-size: 15px;
  padding: 3px;
  padding-right: 10px;
  :hover {
    background-color: #e9e9e9;
  }
`;

const BiGlobes = styled(BiGlobe)`
  border-radius: 10px;
  padding: 3px;

  :hover {
    background-color: #e9e9e9;
  }
`;

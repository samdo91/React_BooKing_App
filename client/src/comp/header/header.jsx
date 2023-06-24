import React from "react";
import { DiAtom } from "react-icons/di";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import {
  searchBarStates,
  itemDatas,
  zoroItems,
  itemDataLists,
  loginStates,
  loginModals,
} from "../../Store/Global/Index";
import DefaultSearchBar from "./SearchBar/DefaultSearchBar";
import AnywhereSearchBar from "./SearchBar/AnywhereSearchBar/AnywhereSearchBar";
import { BiGlobe } from "react-icons/bi";
import LoginMenu from "./LoginMenu/LoginMenu";
import { Link } from "react-router-dom";
import UsualSearchBar from "./SearchBar/UsualSearchBar/UsualSearchBar";
import LoginPopUp from "../LoginPage/LoginPopUp";

function Header(props) {
  const { search } = props;

  // searchBarState: 서치바의 변경에 사용한다. 서치바의 값을 변경하여 디폴트, 웨어, 에니워어로 서치창을 변경
  // loginMenuToggle: 로그인메뉴아이콘을 클릭했을 때 로그인 메뉴의 메뉴를 토글한다.
  // loginState: false - 이걸로 로그인이 되었는지 안되어 있는지 알 수 있음
  const [searchBarState, setSearchBarState] = useAtom(searchBarStates);
  const [itemData, setItemData] = useAtom(itemDatas);
  const [itemDataList, setItemDataList] = useAtom(itemDataLists);
  const [zoroItem, setZoroItem] = useAtom(zoroItems);
  const [loginState, setLoginState] = useAtom(loginStates);
  const [loginModal, setLoginModal] = useAtom(loginModals);

  const logoLink = () => {
    setZoroItem(false);
    setItemDataList(itemData);
  };

  const handleButtonClick = () => {
    if (loginState) {
      window.location.href = "/myPage/Accommodation";
    } else {
      setLoginModal(true);
    }
  };

  return (
    <HeaderPage>
      {/* H1 */}
      <H1>
        <div>
          <DiAtom />
        </div>
        <Link to={"/"} onClick={logoLink}>
          {/* span */}
          <span>Boking.com</span>
        </Link>
      </H1>

      {/* SearchBar */}
      {search ? (
        <UsualSearchBar />
      ) : (
        <SearchBar>
          {/* DefaultSearchBar */}
          {searchBarState === "default" ? (
            <DefaultSearchBar />
          ) : searchBarState === "anywhere" ? (
            /* AnywhereSearchBar */
            <AnywhereSearchBar />
          ) : (
            ""
          )}
        </SearchBar>
      )}

      {/* HeaderRight */}
      <HeaderRight>
        {/* SellMyAirbnb */}
        <SellMyAirbnb onClick={handleButtonClick}>
          당신의 공간을 에어비앤비하세요
        </SellMyAirbnb>
        <BiGlobes />
      </HeaderRight>

      {/* LoginMenu */}
      <LoginMenu />

      {/* LoginPopUp */}
      {loginModal ? <LoginPopUp /> : ""}
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

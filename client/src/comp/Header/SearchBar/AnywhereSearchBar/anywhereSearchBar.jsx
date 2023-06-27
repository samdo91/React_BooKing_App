import React, { useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

function AnywhereSearchBar() {
  const [underBorder, setUnderBorder] = useState("lodgings");

  const handleButtonClick = (e) => {
    setUnderBorder(e.target.value);
  };

  return (
    <AnywhereSearchBarContainer>
      <Lodgings
        underBorder={underBorder}
        value="lodgings"
        onClick={handleButtonClick}
      >
        숙소
      </Lodgings>
      <Experience
        underBorder={underBorder}
        value="experience"
        onClick={handleButtonClick}
      >
        체험
      </Experience>
      <Online
        underBorder={underBorder}
        value="online"
        onClick={handleButtonClick}
      >
        온라인체험
      </Online>
    </AnywhereSearchBarContainer>
  );
}

export default AnywhereSearchBar;

const AnywhereSearchBarContainer = styled.div`
  display: flex;
  font-size: 7px;
  justify-content: space-around;
  width: 200px;
`;

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0, 0, 0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0, -4px, 0);
  }
`;

const Lodgings = styled.button`
  border-bottom-width: ${(props) =>
    props.underBorder === "lodgings" ? "1px" : "0px"};
  border-color: #e9e9e9;
  border-style: solid;

  :hover {
    border-bottom: 1px solid transparent;
    /* animation: ${bounce} 1s ease infinite;
    width: 0px;
    height: 100px;

    border-bottom: 10px solid transparent;
    margin: 15px 40px; */
  }
`;

const Experience = styled.button`
  border-bottom-width: ${(props) =>
    props.underBorder === "experience" ? "1px" : "0px"};
  border-color: #e9e9e9;
  border-style: solid;

  :hover {
    border-bottom: 1px solid #e9e9e9;
  }
`;

const Online = styled.button`
  border-bottom-width: ${(props) =>
    props.underBorder === "online" ? "1px" : "0px"};
  border-color: #e9e9e9;
  border-style: solid;

  :hover {
    border-bottom: 1px solid #e9e9e9;
  }
`;

/*
  주석:
  - 오탈자 수정
  - 컴포넌트는 UpperCamelCase로 작성하고, 일반 코딩은 lowerCamelCase로 작성해야 합니다.
  - 기존 주석 유지
  - 수정된 내용을 코드 아래 주석으로 남겨야 합니다.
  - 수정 내용:
    - SetUnderBorder 함수 이름을 setUnderBorder로 변경
    - handlebuttonclick 함수 이름을 handleButtonClick으로 변경
    - AnywhereSearchBarBox 컴포넌트 이름을 AnywhereSearchBarContainer로 변경
    - hover 스타일 설정 주석 처리
    - 컴포넌트와 변수의 오탈자 수정
    - AnywhereSearchBarBox 스타일드 컴포넌트를 AnywhereSearchBarContainer로 변경
*/

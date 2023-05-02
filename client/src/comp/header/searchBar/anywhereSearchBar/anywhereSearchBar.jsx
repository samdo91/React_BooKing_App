import React, { useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
function AnywhereSearchBar() {
  const [underBorder, SetUnderBorder] = useState("lodgings");

  const handlebuttonclick = (e) => {
    SetUnderBorder(e.target.value);
  };

  return (
    <AnywhereSearchBarBox>
      <Lodgings
        underBorder={underBorder}
        value="lodgings"
        onClick={handlebuttonclick}
      >
        숙소
      </Lodgings>
      <Experience
        underBorder={underBorder}
        value="experience"
        onClick={handlebuttonclick}
      >
        체험
      </Experience>
      <Online
        underBorder={underBorder}
        value="online"
        onClick={handlebuttonclick}
      >
        온라인체험
      </Online>
    </AnywhereSearchBarBox>
  );
}

export default AnywhereSearchBar;

const AnywhereSearchBarBox = styled.div`
  display: flex;
  font-size: 7px;
  justify-content: space-around;
  width: 200px;
`;

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const Lodgings = styled.button`
  border-bottom-width: ${(props) => {
    return props.underBorder === "lodgings" ? "1px" : "0px";
  }};

  border-color: #e9e9e9;
  border-style: solid;
  :hover {
    border-bottom: 1px solid transparent;
    // animation: ${bounce} 1s ease infinite;
    // width: 0px;
    // height: 100px;

    // border-bottom: 10px solid transparent;
    // margin: 15px 40px;
  }
`;

const Experience = styled.button`
  border-bottom-width: ${(props) => {
    return props.underBorder === "experience" ? "1px" : "0px";
  }};
  border-color: #e9e9e9;
  border-style: solid;
  :hover {
    border-bottom: 1px solid #e9e9e9;
  }
`;

const Online = styled.button`
  border-bottom-width: ${(props) => {
    return props.underBorder === "online" ? "1px" : "0px";
  }};

  border-color: #e9e9e9;
  border-style: solid;
  :hover {
    border-bottom: 1px solid #e9e9e9;
  }
`;

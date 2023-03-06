import React, { useState } from "react";
import styled from "@emotion/styled";

function AnywhereSearchBar() {
  const [underBorder, SetUnderBorder] = useState("lodgings");
  console.log("underBorder :>> ", underBorder);

  return (
    <AnywhereSearchBarBox>
      <Lodgings underBorder={underBorder} underLine={px}>
        숙소
      </Lodgings>
      <Experience underBorder={underBorder}>체험</Experience>
      <Online underBorder={underBorder}>온라인체험</Online>
    </AnywhereSearchBarBox>
  );
}

export default AnywhereSearchBar;

const AnywhereSearchBarBox = styled.div`
  display: flex;
`;

const underLine = {
  px: "10px solid #e9e9e9",
  zero: "0px solid #e9e9e9",
};

const Lodgings = styled.div`
  color: ${(props) => {
    return props.underBorder === "lodgings" ? "blue" : "red";
  }};

  border-bottom: ${(props) => {
    props.underBorder === "lodgings" ? underLine[px] : underLine[zero];
  }};
`;

const Experience = styled.div`
  border-bottom: ${(props) => {
    props.underBorder === "experience"
      ? "1px solid #e9e9e9;"
      : "0px solid #e9e9e9;";
  }};
`;

const Online = styled.div`
  border-bottom: ${(props) => {
    props.underBorder === "online"
      ? "1px solid #e9e9e9;"
      : "0px solid #e9e9e9;";
  }};
`;

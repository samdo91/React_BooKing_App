import React from "react";

function BoardItemCard(props) {
  const { country, city, hostName, picture, price, type } = props;

  console.log("props", props);
  return <div>BoardItemCard</div>;
}

export default BoardItemCard;

//react-modal은 emotion/styled로 스타일을 바꿀 수 없다.
//그래서 이 래퍼가 필요한 것이다.
import React from "react";
import Modal from "react-modal";

export const ModalDecorator = ({ className, ...props }) => {
  const [name] = (className && className.split(" ")) || [""];
  const styles = name
    ? {
        portalClassName: name,
        overlayClassName: `${name}__Overlay`,
        className: `${name}__Content`,
      }
    : {};

  return <Modal {...styles} {...props} />;
};

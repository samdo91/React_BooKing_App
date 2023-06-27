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

import React from "react";
import styled from "@emotion/styled";
import Modal from "react-modal";
import { useAtom } from "jotai";
import { loginModals } from "../store/global/index";

import { ModalDecorator } from "../store/wrapper/modalDecorator";

function LoginPopUp() {
  const [loginModal, setLoginModal] = useAtom(loginModals);
  return (
    <div>
      <StyledModal
        isOpen={loginModal}
        onRequestClose={() => setLoginModal(false)}
      >
        This is Modal content
      </StyledModal>
    </div>
  );
}

export default LoginPopUp;
const StyledModal = styled(ModalDecorator)`
  &__Overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: black;
  }

  &__Content {
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    border: 1px solid #cccccc;
    background: #fff;
    overflow: auto;
    border-radius: 4px;
    outline: none;
    padding: 20px;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
`;

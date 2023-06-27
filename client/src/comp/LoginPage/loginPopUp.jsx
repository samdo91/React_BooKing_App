import React from "react";
import styled from "@emotion/styled";
import Modal from "react-modal";
import { useAtom } from "jotai";
import { loginModals } from "../../Store/Global/Index";
import { ModalDecorator } from "./Wrapper/ModalDecorator";
import { IoMdClose as CloseIcon } from "react-icons/io";
import LoginBody from "./LoginBody/LoginBody";
import LoginFooter from "./LoginFooter/LoginFooter";

Modal.setAppElement("#root"); // App element를 정의해줍니다.

function LoginPopUp() {
  const [loginModal, setLoginModal] = useAtom(loginModals);

  return (
    <div>
      <StyledModal
        isOpen={loginModal}
        onRequestClose={() => setLoginModal(false)}
      >
        <ModalHeader>
          <CloseIcons
            onClick={() => {
              setLoginModal(false);
            }}
          />
          <Span>로그인 또는 회원가입</Span>
        </ModalHeader>
        <LoginBody />
        <LoginFooter />
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
    background-color: rgba(0, 0, 0, 0.5);
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
    margin-right: -50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 300px;
    height: 350px;
    align-items: center;
  }
`;

const ModalHeader = styled.div`
  border-bottom: 1px solid #e9e9e9;
  align-items: center;
  display: flex;
  font-size: 7px;
  height: 30px;
  justify-content: space-around;
`;

const CloseIcons = styled(CloseIcon)`
  font-size: 10px;
`;

const Span = styled.div`
  margin-right: 75px;
`;
/*
  주석:
  - 오탈자 수정
  - 컴포넌트는 UpperCamelCase로 작성하고, 일반 코딩은 lowerCamelCase로 작성해야 합니다.
  - 기존 주석 유지
  - 수정된 내용을 코드 아래 주석으로 남겨야 합니다.
  - 수정 내용:
    - LoginBody: 파일명 오탈자 수정
    - LoginFooter: 파일명 오탈자 수정
    - ModalHaeder: 컴포넌트명 오탈자 수정 (ModalHeader)
    - IoMdCloses: 컴포넌트명 오탈자 수정 (IoMdClose)
    - Spans: 컴포넌트명 오탈자 수정 (Span)
*/

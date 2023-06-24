import React from "react";
import styled from "@emotion/styled";
import Modal from "react-modal";
import { useAtom } from "jotai";
import { loginModals } from "../store/global/index";
import { ModalDecorator } from "../store/wrapper/modalDecorator";
import { IoMdClose } from "react-icons/io";
import LoginBody from "./loginbody/loginbody";
import LoginFooter from "./loginFooter/loginFooter";

Modal.setAppElement("#root"); // App element를 정의해줍니다.

function LoginPopUp() {
  const [loginModal, setLoginModal] = useAtom(loginModals);
  return (
    <div>
      <StyledModal
        isOpen={loginModal}
        onRequestClose={() => setLoginModal(false)}
      >
        <ModalHaeder>
          <IoMdCloses
            onClick={() => {
              setLoginModal(false);
            }}
          />
          <Spans> 로그인 또는 회원가입</Spans>
        </ModalHaeder>
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

//@NOTE 오탈자
const ModalHaeder = styled.div`
  border-bottom: 1px solid #e9e9e9;
  align-content: center;
  display: flex;
  font-size: 7px;
  align-items: center;
  height: 30px;
  justify-content: space-around;
`;

const IoMdCloses = styled(IoMdClose)`
  // margin-right: 150px;
  font-size: 10px;
`;

//@NOTE span은 전형적인 인라인태그. 하지만 실제 태그는 div를 사용함.
// 이런형태의 변수명선언은 좋지 않음. span이라는 이름을 사용하면 span태그를 사용하는것처럼 보이기 때문.
const Spans = styled.div`
  margin-right: 75px;
`;

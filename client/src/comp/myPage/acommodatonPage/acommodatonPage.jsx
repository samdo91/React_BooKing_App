import React, { useEffect, useState } from "react";
import Header from "../../header/header";
import { useAtom } from "jotai";
import {
  userDataAtom,
  loginModals,
  loginStates,
} from "../../store/global/index";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

function AcommodatonPage() {
  /* userData: DB에서 가져온 유저의 데이터 로그인이 되어 있다면 데이터가 있음.(!! 기본 데이터가 있어서 불리언으로 못씀)
loginModal:로그인용 모달을 불러옴 : 불리언 값으로 되어있음
loginState: 로그인 여부. 로그인이 되어 있다면 true
acommodatonTitle: 숙소 이름, 간판
acommodatonAddress: 주소
photosLinks: 사진을 링크로 저장할때 쓰는 스테이트
acommodatonPhotos: 숙소 사진,링크나 디렉토리로 저장됨.
*/
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [loginState, setLoginState] = useAtom(loginStates);
  const [acommodatonTitle, setAcommodatonTitle] = useState("");
  const [acommodatonAddress, setAcommodatonAddress] = useState("");
  const [photosLinks, setPhotosLinks] = useState("");
  const [acommodatonPhotos, setAcommodatonPhotos] = useState([]);

  useEffect(() => {
    if (!loginState) {
      setLoginModal(true);
    }
  }, []);

  const photoLinkButton = (e) => {
    e.preventDefault();
    if (photosLinks === "") {
      alert("링크를 등록해주세요.");
    } else {
      setAcommodatonPhotos([...acommodatonPhotos, photosLinks]);
      setPhotosLinks("");
    }
    console.log("acommodatonPhotos", acommodatonPhotos);
  };
  return (
    <div>
      <Header />
      <Body>
        <Directory>
          <Link to="/myPage">
            <H1>마이페이지</H1>
          </Link>
          <div>--</div>
          <Link to="/myPage/Account">
            <H1>숙소 등록</H1>
          </Link>
        </Directory>
        <Form>
          <H2>Title</H2>
          <p>숙소 이름을 적어주세요. 당신의 숙소의 이름이 됩니다.</p>
          <Input
            type="text"
            placeholder="숙소 이름을 적어주세요"
            value={acommodatonTitle}
            onChange={(e) => {
              setAcommodatonTitle(e.target.value);
            }}
          />
          <p>주소를 적어주세요. </p>
          <Input
            type="text"
            placeholder="주소를 적어주세요."
            value={acommodatonAddress}
            onChange={(e) => {
              setAcommodatonAddress(e.target.value);
            }}
          />

          <PhotoSection>
            <H2>photos</H2>
            <p>
              사진을 추가해주세요. 링크를 등록하려면 "링크추가!" 컴퓨터 안의
              사진을 추가하려면 "사진+"를 눌러주세요
            </p>
            <PhotoLink>
              <div>
                <Input
                  type="text"
                  placeholder=" 인터넷 링크 사진을 가지고 있다면 사진을 등록하세요."
                  value={photosLinks}
                  onChange={(e) => {
                    setPhotosLinks(e.target.value);
                  }}
                />
                <PhotoLinkButton onClick={photoLinkButton}>
                  링크 추가!
                </PhotoLinkButton>
              </div>
            </PhotoLink>

            <PhotoButton>사진 + </PhotoButton>
          </PhotoSection>
        </Form>
      </Body>
    </div>
  );
}

export default AcommodatonPage;

const Body = styled.div`
  margin-left: 200px;
  margin-right: 200px;
`;

const H1 = styled.div`
  font-size: 30px;
`;
const Directory = styled.div`
  display: flex;
`;

const Input = styled.input`
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px gray;
  border: 1px solid #dcdcdc;
  margin-bottom: 15px;
  width: 800px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px;
  justify-content: flex-start;
`;

const H2 = styled.div`
  font-size: 20px;
  margin: 15px;
`;

const PhotoButton = styled.button`
  display: flex;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  width: 70px;
  justify-content: center;
  background-color: #ff59b3;
`;

const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const PhotoLink = styled.div`
  display: flex;
  flex-direction: column;
`;

const PhotoLinkButton = styled.button`
  border-radius: 10px;
  width: 90px;
  background-color: #ff59b3;
  justify-content: center;
  height: 30px;
`;

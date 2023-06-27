import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useParams, Link } from "react-router-dom";
import {
  userDataAtom,
  loginModals,
  loginStates,
  addPages,
} from "../../../../Store/Global/Index";
import styled from "@emotion/styled";
import axios from "axios";
import PerksSection from "./Section/PerksSection";
import TypeSection from "./Section/TypeSection";
import PhotoSection from "./Section/PhotoSection";

const PROXY =
  window.location.hostname === "localhost" ? "http://127.0.0.1:4000" : "/proxy";
function AddAccommodationPage() {
  /* 
  userData: DB에서 가져온 유저의 데이터. 로그인이 되어 있다면 데이터가 있음. (!! 기본 데이터가 있어서 불리언으로 못씀)
  loginModal: 로그인용 모달을 불러옴. 불리언 값으로 되어있음
  loginState: 로그인 여부. 로그인이 되어 있다면 true
  addPage: AccommodationPage에 숙소 추가 페이지를 열고 닫는 아톰
  AccommodationTitle: 숙소 이름, 간판
  AccommodationAddress: 주소
  photosLinks: 사진을 링크로 저장할 때 쓰는 스테이트
  AccommodationPhotos: 숙소 사진, 링크나 디렉토리로 저장됨
  AccommodationDescription: 숙소 설명
  AccommodationCheckIn: 체크인 시간
  AccommodationCheckOut: 체크아웃 시간
  AccommodationMaxGuests: 최대 인원
  AccommodationType: 숙소의 타입
  AccommodationHostName: 호스트 이름
  AccommodationCountry: 나라
  AccommodationCity: 도시
  AccommodationPrice: 1박당 가격
  */
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [loginState, setLoginState] = useAtom(loginStates);
  const [addPage, setAddPage] = useAtom(addPages);
  const [accommodationTitle, setAccommodationTitle] = useState("");
  const [accommodationAddress, setAccommodationAddress] = useState("");
  const [photosLinks, setPhotosLinks] = useState("");
  const [accommodationPhotos, setAccommodationPhotos] = useState([]);
  const [accommodationDescription, setAccommodationDescription] = useState([]);
  const [accommodationPerks, setAccommodationPerks] = useState([]);
  const [accommodationType, setAccommodationType] = useState([]);
  const [accommodationExtraInfo, setAccommodationExtraInfo] = useState("");
  const [accommodationCheckIn, setAccommodationCheckIn] = useState("");
  const [accommodationCheckOut, setAccommodationCheckOut] = useState("");
  const [accommodationMaxGuests, setAccommodationMaxGuests] = useState("");
  const [accommodationCountry, setAccommodationCountry] = useState("");
  const [accommodationCity, setAccommodationCity] = useState("");
  const [accommodationPrice, setAccommodationPrice] = useState("");
  const [accommodationHostName, setAccommodationHostName] = useState("");

  const state_LIST = [
    accommodationTitle,
    accommodationAddress,
    accommodationPhotos,
    accommodationDescription,
    accommodationPerks,
    accommodationType,
    accommodationExtraInfo,
    accommodationCheckIn,
    accommodationCheckOut,
    accommodationMaxGuests,
    accommodationCountry,
    accommodationCity,
    accommodationPrice,
    accommodationHostName,
  ];

  const { id } = useParams();

  useEffect(() => {
    async function fetchAccommodationData() {
      const response = await axios.get(`${PROXY}/accommodation/${id}`);
      const data = response.data;
      // Fetch and set the accommodation data based on the ID parameter
      setAccommodationTitle(data.title);
      setAccommodationAddress(data.address);
      setPhotosLinks(data.photos.join(", "));
      setAccommodationPhotos(data.photos);
      setAccommodationDescription(data.description);
      setAccommodationPerks(data.perks);
      setAccommodationType(data.type);
      setAccommodationExtraInfo(data.extraInfo);
      setAccommodationCheckIn(data.checkIn);
      setAccommodationCheckOut(data.checkOut);
      setAccommodationMaxGuests(data.maxGuests);
      setAccommodationCountry(data.country);
      setAccommodationCity(data.city);
      setAccommodationPrice(data.price);
      setAccommodationHostName(data.hostName);
    }

    fetchAccommodationData();
  }, [id]);

  useEffect(() => {
    if (!loginState) {
      setLoginModal(true);
    }
  }, [loginState, setLoginModal]);

  const accommodationData = {
    title: accommodationTitle,
    address: accommodationAddress,
    photos: accommodationPhotos,
    description: accommodationDescription,
    perks: accommodationPerks,
    type: accommodationType,
    extraInfo: accommodationExtraInfo,
    checkIn: accommodationCheckIn,
    checkOut: accommodationCheckOut,
    maxGuests: accommodationMaxGuests,
    country: accommodationCountry,
    city: accommodationCity,
    price: accommodationPrice,
    hostName: accommodationHostName,
  };

  const saveButtons = async () => {
    try {
      const response = await axios.post(
        `${PROXY}/accommodation/save`,
        accommodationData
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AddAccommodationContainer>
      <MainContainer>
        <Link to="/accommodation">
          <ExitButton>X</ExitButton>
        </Link>
        <AccommodationInputContainer>
          <TypeSection
            type={accommodationType}
            setType={setAccommodationType}
          />
          <Input
            placeholder="숙소 이름, 간판"
            value={accommodationTitle}
            onChange={(e) => setAccommodationTitle(e.target.value)}
          />
          <Input
            placeholder="주소"
            value={accommodationAddress}
            onChange={(e) => setAccommodationAddress(e.target.value)}
          />
          <PhotoSection
            photosLinks={photosLinks}
            setPhotosLinks={setPhotosLinks}
            accommodationPhotos={accommodationPhotos}
            setAccommodationPhotos={setAccommodationPhotos}
          />
          <Textarea
            placeholder="숙소 설명"
            value={accommodationDescription}
            onChange={(e) => setAccommodationDescription(e.target.value)}
          />
          <PerksSection
            perks={accommodationPerks}
            setPerks={setAccommodationPerks}
          />
          <Textarea
            placeholder="추가 설명"
            value={accommodationExtraInfo}
            onChange={(e) => setAccommodationExtraInfo(e.target.value)}
          />
          <CheckInputContainer>
            <CheckInput
              type="time"
              value={accommodationCheckIn}
              onChange={(e) => setAccommodationCheckIn(e.target.value)}
            />
            <CheckInput
              type="time"
              value={accommodationCheckOut}
              onChange={(e) => setAccommodationCheckOut(e.target.value)}
            />
          </CheckInputContainer>
          <Input
            type="number"
            placeholder="최대 인원"
            value={accommodationMaxGuests}
            onChange={(e) => setAccommodationMaxGuests(e.target.value)}
          />
          <Input
            placeholder="나라"
            value={accommodationCountry}
            onChange={(e) => setAccommodationCountry(e.target.value)}
          />
          <Input
            placeholder="도시"
            value={accommodationCity}
            onChange={(e) => setAccommodationCity(e.target.value)}
          />
          <Input
            type="number"
            placeholder="1박당 가격"
            value={accommodationPrice}
            onChange={(e) => setAccommodationPrice(e.target.value)}
          />
          <Input
            placeholder="호스트 이름"
            value={accommodationHostName}
            onChange={(e) => setAccommodationHostName(e.target.value)}
          />
        </AccommodationInputContainer>
      </MainContainer>
      <SaveButtons>
        <SaveButton onClick={saveButtons}>저장</SaveButton>
        <CancelButton onClick={() => setAddPage(false)}>취소</CancelButton>
      </SaveButtons>
    </AddAccommodationContainer>
  );
}

export default AddAccommodationPage;

const AddAccommodationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 24px;
`;

const MainContainer = styled.div`
  width: 100%;
  max-width: 720px;
  margin-bottom: 40px;
`;

const ExitButton = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const AccommodationInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  outline: none;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  outline: none;
  resize: vertical;
`;

const CheckInputContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const CheckInput = styled.input`
  width: 100px;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  outline: none;
`;

const SaveButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const SaveButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background-color: #1890ff;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background-color: #f1f1f1;
  color: #595959;
  font-weight: bold;
  cursor: pointer;
`;

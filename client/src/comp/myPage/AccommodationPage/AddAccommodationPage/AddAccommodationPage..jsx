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

function AddAccommodationPage() {
  /* userData: DB에서 가져온 유저의 데이터 로그인이 되어 있다면 데이터가 있음.(!! 기본 데이터가 있어서 불리언으로 못씀)
loginModal:로그인용 모달을 불러옴 : 불리언 값으로 되어있음
loginState: 로그인 여부. 로그인이 되어 있다면 true
addPage: AccommodationPage에 숙소 추가 페이지를 열고 닫는 아톰
AccommodationTitle: 숙소 이름, 간판
AccommodationAddress: 주소
photosLinks: 사진을 링크로 저장할때 쓰는 스테이트
AccommodationPhotos: 숙소 사진,링크나 디렉토리로 저장됨.
AccommodationDescription: 숙소 설명 
AccommodationCheckIn: 체크인 시간 
AccommodationCheckOut: 체크 아웃 시간
AccommodationMaxGuests: 최대 인원
AccommodationType:숙소의 타입
AccommodationhostName: 호스트 이름 
AccommodationCountry: 나라, 
AccommodationCity: 도시, 
AccommodationPrice: 1박당 가격,

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
  const [accommodationhostName, setAccommodationhostName] = useState("");

  const state_LIST = [
    accommodationTitle,
    accommodationAddress,
    accommodationPhotos,
    accommodationDescription,
    accommodationPerks,
    accommodationExtraInfo,
    accommodationCheckIn,
    accommodationCheckOut,
    accommodationMaxGuests,
    accommodationPrice,
    accommodationCity,
    accommodationhostName,
    accommodationCountry,
    accommodationType,
  ];
  const { id } = useParams();

  const detailFixButton = async (e) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/detailFixAccommodation",
        {
          id: id,
        }
      );
      const myAccommodation = response.data[0];
      setAccommodationTitle(myAccommodation.title);
      setAccommodationAddress(myAccommodation.address);
      setAccommodationPhotos(myAccommodation.photos);
      setAccommodationDescription(myAccommodation.description);
      setAccommodationPerks(myAccommodation.perks);
      setAccommodationType(myAccommodation.type);
      setAccommodationExtraInfo(myAccommodation.extraInfo);
      setAccommodationCheckIn(myAccommodation.checkIn);
      setAccommodationCheckOut(myAccommodation.checkOut);
      setAccommodationMaxGuests(myAccommodation.maxGuests);
      setAccommodationCountry(myAccommodation.country);
      setAccommodationCity(myAccommodation.city);
      setAccommodationPrice(myAccommodation.price);
      setAccommodationhostName(myAccommodation.hostName);
    } catch (error) {
      console.error("id가 없은 토큰이 없거나 로그인이 안되어 있음");
      // 에러 메시지를 사용자에게 알려줄 수 있는 방법을 구현해주세요.
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    } else {
      detailFixButton();
    }
  }, [id]);

  useEffect(() => {
    if (!loginState) {
      setLoginModal(true);
    }
  }, []);

  const acommodatoData = {
    title: accommodationTitle,
    address: accommodationAddress,
    photos: accommodationPhotos,
    description: accommodationDescription,
    perks: accommodationPerks,
    extraInfo: accommodationExtraInfo,
    checkIn: accommodationCheckIn,
    checkOut: accommodationCheckOut,
    maxGuests: accommodationMaxGuests,
    type: accommodationType,
    hostName: accommodationhostName,
    city: accommodationCity,
    price: accommodationPrice,
    country: accommodationCountry,
  };

  // saveButten 펑션 서버에 db로 데이터를 보내는 펑션
  const savebuttons = async (e) => {
    e.preventDefault();
    //항목들이 비어 있는가 채크. 채워져있다면 true, 아니라면 false
    const blankTest = state_LIST.every((value) => {
      return value !== "";
    });

    if (blankTest) {
      if (id) {
        const response = await axios.post(
          "http://127.0.0.1:4000/accommodationReseve",
          { id, ...acommodatoData }
        );
      } else {
        const response = await axios.post(
          "http://127.0.0.1:4000/accommodationSeve",
          { ...acommodatoData }
        );
      }
    } else {
      alert("빈칸이 있어요.");
    }
    setAddPage(false);
  };

  /*
   하나의 파일만 들어올때는 set으로 만들면 된다.
  const photoUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const filesData = new FormData();
    filesData.set("photos", file);
    console.log(file);

    console.log(filesData);

    await axios
      .post("http://127.0.0.1:4000/photosUploads", filesData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filename } = response;
        const links = filename[0].filename;
        console.log("response", response);
        console.log("link", links);
        setAccommodationPhotos([...AccommodationPhotos, links]);
      });
  };
   */
  // 두개 이상의 파일이 들어온다면 set이 아닌 append를 사용해서 추가해야 한다. 물론 하나도 가능하다.

  return (
    <div>
      <Body>
        <Form>
          <H2>Title</H2>
          <p>숙소 이름을 적어주세요. 당신의 숙소의 이름이 됩니다.</p>
          <Input
            type="text"
            placeholder="숙소 이름을 적어주세요"
            value={accommodationTitle}
            onChange={(e) => {
              setAccommodationTitle(e.target.value);
            }}
          />

          <p>주소를 적어주세요. </p>
          <Input
            type="text"
            placeholder="나라를 적어주세요."
            value={accommodationCountry}
            onChange={(e) => {
              setAccommodationCountry(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="도시를 적어주세요."
            value={accommodationCity}
            onChange={(e) => {
              setAccommodationCity(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder=" 나머지 주소를 적어주세요."
            value={accommodationAddress}
            onChange={(e) => {
              setAccommodationAddress(e.target.value);
            }}
          />

          <H2>HostName</H2>
          <p>숙소의 주인 이름 적어주세요.</p>
          <Input
            type="text"
            placeholder="당신 혹은 숙소 주인 이름이요."
            value={accommodationhostName}
            onChange={(e) => {
              setAccommodationhostName(e.target.value);
            }}
          />

          <H2>Price</H2>
          <p>1박 당 cost를 적어주세요.</p>
          <Input
            type="text"
            placeholder="₩"
            value={accommodationPrice}
            onChange={(e) => {
              setAccommodationPrice(e.target.value);
            }}
          />
          <PhotoSection
            AccommodationPhotos={accommodationPhotos}
            setAccommodationPhotos={setAccommodationPhotos}
            photosLinks={photosLinks}
            setPhotosLinks={setPhotosLinks}
          />

          <H2>Description</H2>
          <p>숙소 설명을 적어주세요. </p>
          <Input
            type="text"
            placeholder="숙소 설명을 적어주세요"
            value={accommodationDescription}
            onChange={(e) => {
              setAccommodationDescription(e.target.value);
            }}
          />
          {/* <PerksSection>
            <H2>Perks</H2>
            <p> 당신의 에어비엔비에 포함된 요소를 적어주세요.</p>
            <PerksInput>
              <Perkslabel>
                <input type="checkbox" />
                <AiOutlineWifi />
                <span>Wifi</span>
              </Perkslabel>
              <Perkslabel>
                <input type="checkbox" />
                <span>TV</span>
              </Perkslabel>
              <Perkslabel>
                <input type="checkbox" />
                <span>Pets</span>
              </Perkslabel>
              <Perkslabel>
                <input type="checkbox" />
                <AiOutlineCar />
                <span>Free parking spot</span>
              </Perkslabel>
              <Perkslabel>
                <input type="checkbox" />
                <span>라디오</span>
              </Perkslabel>
              <Perkslabel>
                <input type="checkbox" />
                <span>드라이기</span>
              </Perkslabel>
            </PerksInput>
          </PerksSection> */}

          <PerksSection
            AccommodationPerks={accommodationPerks}
            setAccommodationPerks={setAccommodationPerks}
          />
          <TypeSection
            AccommodationType={accommodationType}
            setAccommodationType={setAccommodationType}
          />
          <H2>Extra Info</H2>
          <p>숙소의 규칙이나 기타 정보를 기입해주세요. </p>
          <Input
            type="text"
            placeholder="숙소의 규칙이나 기타 정보를 기입해주세요. "
            value={accommodationExtraInfo}
            onChange={(e) => {
              setAccommodationExtraInfo(e.target.value);
            }}
          />
          <CheckInSection>
            <H2>Check In & Out , Max Guests </H2>
            <div>
              <p>체크인 시간을 적어주세요 </p>

              <CheckInput
                type="text"
                placeholder="14:00"
                value={accommodationCheckIn}
                onChange={(e) => {
                  setAccommodationCheckIn(e.target.value);
                }}
              />
            </div>
            <div>
              <p>체크아웃 시간을 적어주세요 </p>
              <CheckInput
                type="text"
                placeholder="11:00"
                value={accommodationCheckOut}
                onChange={(e) => {
                  setAccommodationCheckOut(e.target.value);
                }}
              />
            </div>
            <div>
              <p> 최대수용 인원을 적어주세요 </p>
              <CheckInput
                type="text"
                placeholder="최대 수용인원"
                value={accommodationMaxGuests}
                onChange={(e) => {
                  setAccommodationMaxGuests(e.target.value);
                }}
              />
            </div>
            <SaveLink to="/myPage/Accommodation" onClick={savebuttons}>
              <SaveButton> 저장</SaveButton>
            </SaveLink>
          </CheckInSection>
        </Form>
      </Body>
    </div>
  );
}

export default AddAccommodationPage;

const Body = styled.div`
  margin-left: 200px;
  margin-right: 200px;
`;

const Input = styled.input`
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px gray;
  border: 1px solid #dcdcdc;
  margin: 15px;
  width: 800px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px;
  justify-content: flex-start;
`;

const H2 = styled.div`
  font-size: 25px;
  margin: 20px;
`;

const CheckInSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckInput = styled.input`
  display: flex;
  border: 1px solid #dcdcdc;
  height: 50px;
  width: 300px;
  border-radius: 10px;
  margin: 10px;
`;

const SaveButton = styled.button``;

const SaveLink = styled(Link)`
  justify-content: center;
  align-items: center;
  display: flex;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  background-color: #f5002d;
  color: #dcdcdc;
  text-decoration: none;
`;

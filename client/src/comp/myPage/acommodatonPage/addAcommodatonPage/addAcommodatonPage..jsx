import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  userDataAtom,
  loginModals,
  loginStates,
  addPages,
} from "../../../store/global/index";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import {
  AiOutlineCloudUpload,
  AiOutlineWifi,
  AiOutlineCar,
} from "react-icons/ai";
import axios from "axios";
import PerksSection from "./Section/PerksSection";
import TypeSection from "./Section/typeSection";
import { useParams } from "react-router-dom";
import PhotoSection from "./Section/photoSection";

function AddAcommodatonPage() {
  /* userData: DB에서 가져온 유저의 데이터 로그인이 되어 있다면 데이터가 있음.(!! 기본 데이터가 있어서 불리언으로 못씀)
loginModal:로그인용 모달을 불러옴 : 불리언 값으로 되어있음
loginState: 로그인 여부. 로그인이 되어 있다면 true
addPage: AcommodatonPage에 숙소 추가 페이지를 열고 닫는 아톰
acommodatonTitle: 숙소 이름, 간판
acommodatonAddress: 주소
photosLinks: 사진을 링크로 저장할때 쓰는 스테이트
acommodatonPhotos: 숙소 사진,링크나 디렉토리로 저장됨.
acommodatonDescription: 숙소 설명 
acommodatonCheckIn: 체크인 시간 
acommodatonCheckOut: 체크 아웃 시간
acommodatonMaxGuests: 최대 인원
acommodatonType:숙소의 타입
acommodatonhostName: 호스트 이름 
acommodatonCountry: 나라, 
acommodatonCity: 도시, 
acommodatonPrice: 1박당 가격,

*/
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [loginState, setLoginState] = useAtom(loginStates);
  const [addPage, setAddPage] = useAtom(addPages);
  const [acommodatonTitle, setAcommodatonTitle] = useState("");
  const [acommodatonAddress, setAcommodatonAddress] = useState("");
  const [photosLinks, setPhotosLinks] = useState("");
  const [acommodatonPhotos, setAcommodatonPhotos] = useState([]);
  const [acommodatonDescription, setAcommodatonDescription] = useState([]);
  const [acommodatonPerks, setAcommodatonPerks] = useState([]);
  const [acommodatonType, setAcommodatonType] = useState([]);
  const [acommodatonExtraInfo, setAcommodatonExtraInfo] = useState("");
  const [acommodatonCheckIn, setAcommodatonCheckIn] = useState("");
  const [acommodatonCheckOut, setAcommodatonCheckOut] = useState("");
  const [acommodatonMaxGuests, setAcommodatonMaxGuests] = useState("");
  const [acommodatonCountry, setAcommodatonCountry] = useState("");
  const [acommodatonCity, setAcommodatonCity] = useState("");
  const [acommodatonPrice, setAcommodatonPrice] = useState("");
  const [acommodatonhostName, setAcommodatonhostName] = useState("");

  const state_LIST = [
    acommodatonTitle,
    acommodatonAddress,
    acommodatonPhotos,
    acommodatonDescription,
    acommodatonPerks,
    acommodatonExtraInfo,
    acommodatonCheckIn,
    acommodatonCheckOut,
    acommodatonMaxGuests,
    acommodatonPrice,
    acommodatonCity,
    acommodatonhostName,
    acommodatonCountry,
    acommodatonType,
  ];
  const { id } = useParams();

  const detailFixButton = async (e) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/detailFixAcommodaton",
        {
          id: id,
        }
      );
      const myAcommodaton = response.data[0];
      setAcommodatonTitle(myAcommodaton.title);
      setAcommodatonAddress(myAcommodaton.address);
      setAcommodatonPhotos(myAcommodaton.photos);
      setAcommodatonDescription(myAcommodaton.description);
      setAcommodatonPerks(myAcommodaton.perks);
      setAcommodatonType(myAcommodaton.type);
      setAcommodatonExtraInfo(myAcommodaton.extraInfo);
      setAcommodatonCheckIn(myAcommodaton.checkIn);
      setAcommodatonCheckOut(myAcommodaton.checkOut);
      setAcommodatonMaxGuests(myAcommodaton.maxGuests);
      setAcommodatonCountry(myAcommodaton.country);
      setAcommodatonCity(myAcommodaton.city);
      setAcommodatonPrice(myAcommodaton.price);
      setAcommodatonhostName(myAcommodaton.hostName);
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
    title: acommodatonTitle,
    address: acommodatonAddress,
    photos: acommodatonPhotos,
    description: acommodatonDescription,
    perks: acommodatonPerks,
    extraInfo: acommodatonExtraInfo,
    checkIn: acommodatonCheckIn,
    checkOut: acommodatonCheckOut,
    maxGuests: acommodatonMaxGuests,
    type: acommodatonType,
    hostName: acommodatonhostName,
    city: acommodatonCity,
    price: acommodatonPrice,
    country: acommodatonCountry,
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
          "http://127.0.0.1:4000/acommodatonReseve",
          { id, ...acommodatoData }
        );
      } else {
        const response = await axios.post(
          "http://127.0.0.1:4000/acommodatonSeve",
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
        setAcommodatonPhotos([...acommodatonPhotos, links]);
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
            value={acommodatonTitle}
            onChange={(e) => {
              setAcommodatonTitle(e.target.value);
            }}
          />

          <p>주소를 적어주세요. </p>
          <Input
            type="text"
            placeholder="나라를 적어주세요."
            value={acommodatonCountry}
            onChange={(e) => {
              setAcommodatonCountry(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="도시를 적어주세요."
            value={acommodatonCity}
            onChange={(e) => {
              setAcommodatonCity(e.target.value);
            }}
          />
          <Input
            type="text"
            placeholder=" 나머지 주소를 적어주세요."
            value={acommodatonAddress}
            onChange={(e) => {
              setAcommodatonAddress(e.target.value);
            }}
          />

          <H2>HostName</H2>
          <p>숙소의 주인 이름 적어주세요.</p>
          <Input
            type="text"
            placeholder="당신 혹은 숙소 주인 이름이요."
            value={acommodatonhostName}
            onChange={(e) => {
              setAcommodatonhostName(e.target.value);
            }}
          />

          <H2>Price</H2>
          <p>1박 당 cost를 적어주세요.</p>
          <Input
            type="text"
            placeholder="₩"
            value={acommodatonPrice}
            onChange={(e) => {
              setAcommodatonPrice(e.target.value);
            }}
          />
          <PhotoSection
            acommodatonPhotos={acommodatonPhotos}
            setAcommodatonPhotos={setAcommodatonPhotos}
            photosLinks={photosLinks}
            setPhotosLinks={setPhotosLinks}
          />

          <H2>Description</H2>
          <p>숙소 설명을 적어주세요. </p>
          <Input
            type="text"
            placeholder="숙소 설명을 적어주세요"
            value={acommodatonDescription}
            onChange={(e) => {
              setAcommodatonDescription(e.target.value);
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
            acommodatonPerks={acommodatonPerks}
            setAcommodatonPerks={setAcommodatonPerks}
          />
          <TypeSection
            acommodatonType={acommodatonType}
            setAcommodatonType={setAcommodatonType}
          />
          <H2>Extra Info</H2>
          <p>숙소의 규칙이나 기타 정보를 기입해주세요. </p>
          <Input
            type="text"
            placeholder="숙소의 규칙이나 기타 정보를 기입해주세요. "
            value={acommodatonExtraInfo}
            onChange={(e) => {
              setAcommodatonExtraInfo(e.target.value);
            }}
          />
          <CheckInSection>
            <H2>Check In & Out , Max Guests </H2>
            <div>
              <p>체크인 시간을 적어주세요 </p>

              <CheckInput
                type="text"
                placeholder="14:00"
                value={acommodatonCheckIn}
                onChange={(e) => {
                  setAcommodatonCheckIn(e.target.value);
                }}
              />
            </div>
            <div>
              <p>체크아웃 시간을 적어주세요 </p>
              <CheckInput
                type="text"
                placeholder="11:00"
                value={acommodatonCheckOut}
                onChange={(e) => {
                  setAcommodatonCheckOut(e.target.value);
                }}
              />
            </div>
            <div>
              <p> 최대수용 인원을 적어주세요 </p>
              <CheckInput
                type="text"
                placeholder="최대 수용인원"
                value={acommodatonMaxGuests}
                onChange={(e) => {
                  setAcommodatonMaxGuests(e.target.value);
                }}
              />
            </div>
            <SaveLink to="/myPage/Acommodaton" onClick={savebuttons}>
              <SaveButton> 저장</SaveButton>
            </SaveLink>
          </CheckInSection>
        </Form>
      </Body>
    </div>
  );
}

export default AddAcommodatonPage;

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

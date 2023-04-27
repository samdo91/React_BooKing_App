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
import {
  AiOutlineCloudUpload,
  AiOutlineWifi,
  AiOutlineCar,
} from "react-icons/ai";
import axios from "axios";

function AcommodatonPage() {
  /* userData: DB에서 가져온 유저의 데이터 로그인이 되어 있다면 데이터가 있음.(!! 기본 데이터가 있어서 불리언으로 못씀)
loginModal:로그인용 모달을 불러옴 : 불리언 값으로 되어있음
loginState: 로그인 여부. 로그인이 되어 있다면 true
acommodatonTitle: 숙소 이름, 간판
acommodatonAddress: 주소
photosLinks: 사진을 링크로 저장할때 쓰는 스테이트
acommodatonPhotos: 숙소 사진,링크나 디렉토리로 저장됨.
acommodatonDescription: 숙소 설명 
acommodatonCheckIn: 체크인 시간 
acommodatonCheckOut: 체크 아웃 시간
acommodatonMaxGuests: 최대 인원
*/
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [loginState, setLoginState] = useAtom(loginStates);
  const [acommodatonTitle, setAcommodatonTitle] = useState("");
  const [acommodatonAddress, setAcommodatonAddress] = useState("");
  const [photosLinks, setPhotosLinks] = useState("");
  const [acommodatonPhotos, setAcommodatonPhotos] = useState([]);
  const [acommodatonDescription, setAcommodatonDescription] = useState([]);
  const [acommodatonPerks, setAcommodatonPerks] = useState([]);
  const [acommodatonExtraInfo, setAcommodatonExtraInfo] = useState("");
  const [acommodatonCheckIn, setAcommodatonCheckIn] = useState("");
  const [acommodatonCheckOut, setAcommodatonCheckOut] = useState("");
  const [acommodatonMaxGuests, setAcommodatonMaxGuests] = useState("");

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
  ];

  // perk 리스트만듬
  const CATEGORY_LIST = [
    { id: 0, value: "wife", icon: "AiOutlineWifi" },
    { id: 1, value: "TV", icon: false },
    { id: 2, value: "Pets", icon: false },
    { id: 3, value: "Free parking spot", icon: "AiOutlineCar" },
    { id: 4, value: "라디오", icon: false },
    { id: 5, value: "드라이기", icon: false },
  ];

  useEffect(() => {
    if (!loginState) {
      setLoginModal(true);
    }
  }, []);

  // 체크 박스에 쓰이는 함수. 체크 이벤트를 감지하여 값을 필터 돌려 토글(빼거나 넣거나)한다
  const onCheckedElement = (checked, item) => {
    if (checked) {
      setAcommodatonPerks([...acommodatonPerks, item]);
    } else if (!checked) {
      setAcommodatonPerks(acommodatonPerks.filter((el) => el !== item));
    }
    console.log(acommodatonPerks);
  };

  // photoLink에 링크를 추가한다.
  const photoLinkButton = async (e) => {
    e.preventDefault();

    if (photosLinks === "") {
      alert("링크를 등록해주세요.");
    } else {
      const { data: filename } = await axios.post(
        "http://127.0.0.1:4000/photoLink",
        {
          link: photosLinks,
        }
      );
      console.log(filename);
      setAcommodatonPhotos([...acommodatonPhotos, filename]);
      setPhotosLinks("");
    }
  };
  // saveButten 펑션임
  const savebuttons = (e) => {
    e.preventDefault();
    //항목들이 비어 있는가 채크. 채워져있다면 true, 아니라면 false
    const blankTest = state_LIST.every((value) => {
      return value !== "";
    });

    if (blankTest) {
    } else {
      alert("빈칸이 있어요.");
    }
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
            <PhotoLabel>
              <PhotoInput type="file" />
              <div>
                <AiOutlineCloudUpload />
                사진 +
              </div>
            </PhotoLabel>
            {acommodatonPhotos.length > 0 ? (
              <PhotoZone>
                <h3>여기서 등록된 사진을 볼 수 있습니다. </h3>
                <PhotoZoneBorad>
                  {acommodatonPhotos.map((link) => {
                    return (
                      <SamplePhotos
                        src={`http://localhost:4000/uploads/${link}`}
                      />
                    );
                  })}
                </PhotoZoneBorad>
              </PhotoZone>
            ) : (
              ""
            )}
          </PhotoSection>
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

          <PerksSection>
            <H2>Perks</H2>
            <p> 당신의 에어비엔비에 포함된 요소를 적어주세요.</p>
            <PerksInput>
              {CATEGORY_LIST.map((item) => {
                const icons = item.icon;
                return (
                  <Perkslabel key={item.id}>
                    <input
                      type="checkbox"
                      value={item.value}
                      onChange={(e) => {
                        // onChange로 값이 변경할 때마다.  onCheckedElement 펑션을 실행시킨다.
                        onCheckedElement(e.target.checked, e.target.value);
                      }}
                      checked={
                        acommodatonPerks.includes(item.value) ? true : false
                      }
                    />
                    {item.icon ? <item.icon /> : ""}
                    <span>{item.value}</span>
                  </Perkslabel>
                );
              })}
            </PerksInput>
          </PerksSection>

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
            <SaveButton onClick={savebuttons}> 저장 </SaveButton>
          </CheckInSection>
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

const PhotoLabel = styled.label`
  display: flex;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  width: 300px;
  height: 150px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  flex-direction: column;
`;
const PhotoInput = styled.input`
  ::file-selector-button {
    display: none;
  }
`;

const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const PhotoLink = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PhotoLinkButton = styled.button`
  border-radius: 10px;
  width: 90px;
  background-color: #ff59b3;
  justify-content: center;
  height: 30px;
`;

const PhotoZone = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 15px;
`;

const PhotoZoneBorad = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 330px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  align-items: center;
`;

const SamplePhotos = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  margin: 15px;
`;
const PerksSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const PerksInput = styled.div`
  display: flex;
  margin: 10px;
  flex-wrap: wrap;
`;

const Perkslabel = styled.label`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  font-size: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid #dcdcdc;
  height: 50px;
  width: 300px;
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

const SaveButton = styled.button`
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  background-color: #f5002d;
  color: #dcdcdc;
`;

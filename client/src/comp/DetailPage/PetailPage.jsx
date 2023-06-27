import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { itemDatas, loginModals } from "../../Store/Global/Index";
import Header from "../Header/Header";
import axios from "axios";
import LoginPopUp from "../LoginPage/LoginPopUp";
import styled from "@emotion/styled";
import PriceBox from "./PriceBox/PriceBox";
import MyBookingList from "../MyPage/BookingPage/MyBookingList/MyBookingList";

const PROXY =
  window.location.hostname === "localhost" ? "http://127.0.0.1:4000" : "/proxy";

function DetailPage() {
  //useParams를 사용할때 넘겨준 인자와 같은 인자를 가져와야한다. props라고 생각하면 편함
  let { id } = useParams();
  const [itemData] = useAtom(itemDatas);
  const [detailData, setDetailData] = useState([]);
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [itemSearchSuccess, setItemSearchSuccess] = useState(false);
  const [bookingState, setBookingState] = useState(false);
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    bookingSearch();
    itemSearch();
  }, []);

  const bookingSearch = async () => {
    const response = await axios.post(`${PROXY}/myBooking`);
    const booking = response.data;
    const bookingData = booking.filter((item) => {
      return item.place._id === id;
    });
    if (bookingData.length >= 1) {
      setBookingState(true);
      setBookingData([...bookingData]);
    } else {
      setBookingState(false);
    }
  };

  // 디테일 페이지가 렌더링될 때 id로 Accommodation의 데이터를 가져온다.
  const itemSearch = async () => {
    const response = await axios.post(`${PROXY}/detailPage`, {
      id: id,
    });
    const Accommodation = response.data;
    setDetailData({ ...Accommodation });
    setItemSearchSuccess(true);
  };

  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    type,
    hostName,
    city,
    price,
    country,
  } = detailData;

  return (
    <DetailPageContainer>
      <Header search />
      {loginModal ? <LoginPopUp /> : ""}
      {itemSearchSuccess === true ? (
        <Body>
          {bookingState && bookingData.length > 0 ? (
            <MyBookingList listData={bookingData} />
          ) : null}
          <H1>
            <b>{title}</b>
          </H1>
          <AddressDiv>
            {address} , {city} , {country}
          </AddressDiv>

          <PhotosSection>
            <PhotoDiv>
              <PhotosImg index={0} src={`http://localhost:4000/${photos[0]}`} />
            </PhotoDiv>
            <PhotoDiv>
              <AppPhotoButton
                onClick={() => {
                  alert("포토페이지를 만들어야해요");
                }}
              >
                모든 사진 보기{" "}
              </AppPhotoButton>
              <PhotosImg index={1} src={`http://localhost:4000/${photos[1]}`} />
              <PhotosImg index={2} src={`http://localhost:4000/${photos[2]}`} />
              <PhotosImg index={3} src={`http://localhost:4000/${photos[3]}`} />
              <PhotosImg index={4} src={`http://localhost:4000/${photos[4]}`} />
            </PhotoDiv>
          </PhotosSection>
          <DetailDataSection>
            <LeftSection>
              <HostSection>
                <H2> {`${hostName} 님이 호스팅하는 펜션`}</H2>
                <div>
                  <p> {` 최대 인원 ${maxGuests} 명`}</p>
                  <p> 침실 1개침대 1개욕실 1개</p>
                </div>
              </HostSection>
              <Section>
                <H2>Information</H2>
                <div>
                  <div>
                    <b> 셸프 체크인</b>
                  </div>
                  <p>
                    안내 직원의 도움을 받아 체크인하실 수 있어요. 하드 코딩임{" "}
                  </p>
                </div>

                <div>
                  <div>
                    <b> {`${hostName} 님은 슈퍼호스트입니다`}</b>
                  </div>
                  <p>
                    슈퍼호스트는 풍부한 경험과 높은 평점을 자랑하며 게스트가
                    숙소에서 편안히 머무를 수 있도록 최선을 다하는 호스트입니다.
                    하드코딩임
                  </p>
                </div>
                <div>
                  <div>
                    <b>5월 3일 오후 3:00 전까지 무료로 취소하실 수 있습니다.</b>
                  </div>
                  <p>이부분은 변경되지 않음. 하드 코딩임</p>
                </div>
              </Section>
              <Section>
                <H2> 에어커버 </H2>
                <p>
                  모든 예약에는 호스트가 예약을 취소하거나 숙소 정보가 정확하지
                  않은 경우 또는 체크인에 문제가 있는 상황에 대비한 무료 보호
                  프로그램이 포함됩니다. 이 부분도 하드 코딩임
                </p>
              </Section>
              <Section>
                <H2>Description</H2>
                <div>{description} </div>
                <H2> ExtraInfo</H2>
                <div> {extraInfo}</div>
              </Section>
              <Section>
                <H2> 숙소 편의 시설 </H2>
                <Convenience>
                  {perks.map((item) => {
                    return <ConvenienceItem> - {item} </ConvenienceItem>;
                  })}
                </Convenience>
              </Section>
              <Section>
                <H2> 숙소 스타일 </H2>
                <Convenience>
                  {type.map((item) => {
                    return <ConvenienceItem> - {item} </ConvenienceItem>;
                  })}
                </Convenience>
              </Section>
              <Section>
                <H2>체크인</H2>
                <div>
                  <div>
                    <b>CheckIn</b>
                  </div>
                  <p>{checkIn}:00부터 체크 인이 가능합니다.</p>
                </div>
                <div>
                  <div>
                    <b>CheckOut</b>
                  </div>
                  <p>{checkOut}:00까지 체크아웃해야합니다.</p>
                </div>
              </Section>
            </LeftSection>
            <RightSection>
              <PriceBox id={id} detailData={detailData} />
            </RightSection>
          </DetailDataSection>
        </Body>
      ) : (
        ""
      )}
    </DetailPageContainer>
  );
}

export default DetailPage;

const DetailPageContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  margin-top: 20px;
`;

const H1 = styled.h1`
  font-size: 30px;
`;

const AddressDiv = styled.div`
  margin: 10px;
`;

const PhotosSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-to: 20px;
  height: 590px;
  width: 100%;
`;

const PhotosImg = styled.img`
  width: ${(props) => {
    return props.index === 0 ? " 560px" : "270px";
  }};

  height: ${(props) => {
    return props.index === 0 ? " 560px" : "270px";
  }};

  margin: 10px;
  ${(props) => {
    if (props.index === 0) {
      return "border-bottom-left-radius: 20px; border-top-left-radius: 20px; z-index: 1;";
    } else if (props.index === 2) {
      return "border-top-right-radius: 20px; z-index: 1;";
    } else if (props.index === 4) {
      return "border-bottom-right-radius: 20px; z-index: 1;";
    } else {
      return "z-index: 0;";
    }
  }}
  :hover {
    opacity: 0.6;
  }
`;
const PhotoDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  height: 100px;
`;

const AppPhotoButton = styled.button`
  border: 1px solid #dcdcdc;
  height: 30px;
  width: 140px;
  background-color: white;
  position: absolute;
  right: 400px;
  bottom: 270px;
  z-index: 2;
  border-radius: 10px;
`;

const DetailDataSection = styled.section`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

const LeftSection = styled.div`
  width: 65%;
  height: 100%;

  border-radius: 10px;
  padding: 30px;
`;
const RightSection = styled.div`
  flex: 1;
  padding: 30px;
`;

const HostSection = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border-bottom: 1px solid #dcdcdc;
  box-shadow: 1px 1px #c0c0c0;
  padding: 20px;
`;

const H2 = styled.h2`
  font-size: 20px;
  margin: 10px;
`;

const Section = styled.section`
  border-bottom: 1px solid #dcdcdc;
  box-shadow: 1px 1px #c0c0c0;
  padding: 20px;
`;

const Convenience = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ConvenienceItem = styled.div`
  display: flex;
  width: 330px;
  height: 40px;
  align-items: center;
`;

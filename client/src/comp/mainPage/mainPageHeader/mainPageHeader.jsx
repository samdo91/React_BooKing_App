import { Swiper, SwiperSlide } from "swiper/react";
import {
  GiSouthKorea,
  GiSurprised,
  GiJugglingSeal,
  GiCastle,
  GiPrivate,
  GiSeaCliff,
  GiThumbUp,
  GiJapan,
  GiFarmer,
  GiParkBench,
  GiSparkles,
  GiAbdominalArmor,
  GiElvenCastle,
  GiFarmTractor,
  GiFishingBoat,
  GiNewBorn,
  GiWoodCabin,
  GiTropicalFish,
  GiCampingTent,
} from "react-icons/gi";
import { FaChild, FaSwimmingPool, FaCity } from "react-icons/fa";
import { FiMinimize2 } from "react-icons/fi";
import styled from "@emotion/styled";
// Import Swiper styles

import React, { useRef, useState } from "react";
// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

import "swiper/css/navigation";

// import required modules
import { FreeMode } from "swiper";
import { Navigation } from "swiper";

function MainPageHeader() {
  const clickIcon = (e) => {
    console.dir(e.target);
  };
  return (
    <Body>
      <Swipers
        navigation={true}
        private
        slidesPerView={20}
        spaceBetween={30}
        freeMode={true}
        pagination={true}
        modules={[FreeMode, Navigation]}
        className="mySwiper"
      >
        <SwiperSlides value="koreaHome">
          <GiSouthKorea />
          한옥
        </SwiperSlides>
        <SwiperSlides value="surprise" onClick={clickIcon}>
          <GiSurprised />
          깜짝!
        </SwiperSlides>
        <SwiperSlides value="sea">
          <GiJugglingSeal />
          해변
        </SwiperSlides>
        <SwiperSlides value="child">
          <FaChild />
          키즈
        </SwiperSlides>
        <SwiperSlides value="mansion">
          <GiCastle />
          저택
        </SwiperSlides>
        <SwiperSlides value="private">
          <GiPrivate />
          개인실
        </SwiperSlides>
        <SwiperSlides value="cliff">
          <GiSeaCliff />
          전망
        </SwiperSlides>
        <SwiperSlides value="popularity">
          <GiThumbUp />
          인기
        </SwiperSlides>
        <SwiperSlides value="Ryokan">
          <GiJapan />
          료칸
        </SwiperSlides>
        <SwiperSlides value="countrySide">
          <GiFarmer />
          시골
        </SwiperSlides>
        <SwiperSlides value="park">
          <GiParkBench />
          국립공원
        </SwiperSlides>
        <SwiperSlides value="swimmingPool">
          <FaSwimmingPool />
          수영장
        </SwiperSlides>
        <SwiperSlides value="Luxe">
          <GiSparkles />
          Luxe
        </SwiperSlides>
        <SwiperSlides value="design">
          <GiAbdominalArmor /> 디자인
        </SwiperSlides>
        <SwiperSlides value="castle">
          <GiElvenCastle /> 캐슬
        </SwiperSlides>
        <SwiperSlides value="camping">
          <GiCampingTent />
          캠핑장
        </SwiperSlides>
        <SwiperSlides value="mini">
          <FiMinimize2 />
          소형주택
        </SwiperSlides>
        <SwiperSlides value="farm">
          <GiFarmTractor />
          농장
        </SwiperSlides>
        <SwiperSlides value="city">
          <FaCity />
          상징적 도시
        </SwiperSlides>
        <SwiperSlides value="boat">
          <GiFishingBoat />
          보트
        </SwiperSlides>
        <SwiperSlides value="new">
          <GiNewBorn />
          신규
        </SwiperSlides>
        <SwiperSlides value="cabin">
          <GiWoodCabin />
          통나무집
        </SwiperSlides>
        <SwiperSlides value="tropical">
          <GiTropicalFish />
          열대지역
        </SwiperSlides>
        {/* <SwiperSlides>속세를 벗어난 숙소</SwiperSlides>
        <SwiperSlides>와인농장</SwiperSlides>
        <SwiperSlides>섬</SwiperSlides>
        <SwiperSlides>그랜드피아노</SwiperSlides>
        <SwiperSlides>동굴</SwiperSlides>
        <SwiperSlides>스키를 탄 채로 출입가능</SwiperSlides>
        <SwiperSlides>스키</SwiperSlides>
        <SwiperSlides>호숫가</SwiperSlides>
        <SwiperSlides>사막</SwiperSlides>
        <SwiperSlides>북극</SwiperSlides>
        <SwiperSlides>B&B</SwiperSlides>
        <SwiperSlides>창작공간</SwiperSlides>
        <SwiperSlides>호수근처</SwiperSlides>
        <SwiperSlides>트리하우스</SwiperSlides>
        <SwiperSlides>전문가급 주방</SwiperSlides>
        <SwiperSlides>세상의 꼭대기</SwiperSlides>
        <SwiperSlides>골프장</SwiperSlides>
        <SwiperSlides>민수</SwiperSlides>
        <SwiperSlides>서핑</SwiperSlides>
        <SwiperSlides>컨테이너 하우스</SwiperSlides>
        <SwiperSlides>헛간</SwiperSlides> */}
      </Swipers>
    </Body>
  );
}

export default MainPageHeader;

const Body = styled.div`
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  color: #000;
  margin: 0;
  padding: 0;
`;

const Swipers = styled(Swiper)`
  width: 100%;
  height: 50px;
`;

const SwiperSlides = styled(SwiperSlide)`
  text-align: center;
  width: 20%;
  font-size: 15px;
  background: #ffffff;
  height: 50px;
  display: flex;
  width: 20px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  flex-direction: column;
`;

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
import { useAtom } from "jotai";
import { itemDatas, zoroItems, itemDataLists } from "../../store/global";
// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

import "swiper/css/navigation";

// import required modules
import { FreeMode } from "swiper";
import { Navigation } from "swiper";

function MainPageHeader() {
  const [itemData, setItemData] = useAtom(itemDatas);
  const [itemDataList, setItemDataList] = useAtom(itemDataLists);
  const [zoroItem, setZoroItem] = useAtom(zoroItems);

  // Object.keys로 키를 추출해 리턴한다.
  const findKeys = (e) => {
    const List = Object.keys(e.target);
    const propsKeys = List[1];
    const types = e.target[propsKeys].value;

    const selectList = [];
    const itemList = [...itemData];
    itemList.map((item) => {
      if (item.type.includes(types)) {
        selectList.push(item);
      }
    });

    setItemDataList(selectList);
    return selectList;
  };

  //
  const clickIcon = (event) => {
    const selectList = findKeys(event);
    setZoroItem(false);
    console.log(selectList);

    // 인클루드 메서드를 돌았는 데도 불러온 에어비앤비 아이템이 0이라면 zoroItem을 true값으로 한다.
    if (Array.isArray(selectList) && selectList.length === 0) {
      setZoroItem(true);
    }

    // for (let i = 0, keys = Object.keys(e); i < keys.length; i++) {
    //   if ((id = keys[i].match(/^__react[^$]*(\$.+)$/))) {
    //     id = id[1];
    //     console.log(keys);
    //     setKeyList(id);
    //     break;
    //   }
    // }
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
        <SwiperSlides value="koreaHome" onClick={clickIcon}>
          <GiSouthKorea />
          한옥
        </SwiperSlides>
        <SwiperSlides value="surprise" onClick={clickIcon}>
          <GiSurprised />
          깜짝!
        </SwiperSlides>
        <SwiperSlides value="sea" onClick={clickIcon}>
          <GiJugglingSeal />
          해변
        </SwiperSlides>
        <SwiperSlides value="child" onClick={clickIcon}>
          <FaChild />
          키즈
        </SwiperSlides>
        <SwiperSlides value="mansion" onClick={clickIcon}>
          <GiCastle />
          저택
        </SwiperSlides>
        <SwiperSlides value="private" onClick={clickIcon}>
          <GiPrivate />
          개인실
        </SwiperSlides>
        <SwiperSlides value="cliff" onClick={clickIcon}>
          <GiSeaCliff />
          전망
        </SwiperSlides>
        <SwiperSlides value="popularity" onClick={clickIcon}>
          <GiThumbUp />
          인기
        </SwiperSlides>
        <SwiperSlides value="Ryokan" onClick={clickIcon}>
          <GiJapan />
          료칸
        </SwiperSlides>
        <SwiperSlides value="countrySide" onClick={clickIcon}>
          <GiFarmer />
          시골
        </SwiperSlides>
        <SwiperSlides value="park" onClick={clickIcon}>
          <GiParkBench />
          국립공원
        </SwiperSlides>
        <SwiperSlides value="swimmingPool" onClick={clickIcon}>
          <FaSwimmingPool />
          수영장
        </SwiperSlides>
        <SwiperSlides value="Luxe" onClick={clickIcon}>
          <GiSparkles />
          Luxe
        </SwiperSlides>
        <SwiperSlides value="design" onClick={clickIcon}>
          <GiAbdominalArmor /> 디자인
        </SwiperSlides>
        <SwiperSlides value="castle" onClick={clickIcon}>
          <GiElvenCastle /> 캐슬
        </SwiperSlides>
        <SwiperSlides value="camping" onClick={clickIcon}>
          <GiCampingTent />
          캠핑장
        </SwiperSlides>
        <SwiperSlides value="mini" onClick={clickIcon}>
          <FiMinimize2 />
          소형주택
        </SwiperSlides>
        <SwiperSlides value="farm" onClick={clickIcon}>
          <GiFarmTractor />
          농장
        </SwiperSlides>
        <SwiperSlides value="city" onClick={clickIcon}>
          <FaCity />
          상징적 도시
        </SwiperSlides>
        <SwiperSlides value="boat" onClick={clickIcon}>
          <GiFishingBoat />
          보트
        </SwiperSlides>
        <SwiperSlides value="new" onClick={clickIcon}>
          <GiNewBorn />
          신규
        </SwiperSlides>
        <SwiperSlides value="cabin" onClick={clickIcon}>
          <GiWoodCabin />
          통나무집
        </SwiperSlides>
        <SwiperSlides value="tropical" onClick={clickIcon}>
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
  flex-direction: column;
`;

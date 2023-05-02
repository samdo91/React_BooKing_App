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
    const vat = e.target.value;
    const List = Object.keys(e.target);
    const propsKeys = List[1];
    const types = e.target[propsKeys].value;

    console.log("List", List);
    console.log("propsKeys", propsKeys);
    console.log("types", types);
    console.log("vat", vat);
    const selectList = [];
    const itemList = [...itemData];
    itemList.forEach((item) => {
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
        <SwiperSlides>
          <button value="koreaHome" key="koreaHomeButton" onClick={clickIcon}>
            <PointerEvents>
              <GiSouthKorea />
            </PointerEvents>
            한옥
          </button>
        </SwiperSlides>
        <SwiperSlides>
          <button value="surprise" key="surpriseButton" onClick={clickIcon}>
            <PointerEvents>
              <GiSurprised />
            </PointerEvents>
            깜짝!
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="sea" key="seaButton" onClick={clickIcon}>
            <PointerEvents>
              <GiJugglingSeal />
            </PointerEvents>
            해변
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="child" key="childButton" onClick={clickIcon}>
            <PointerEvents>
              <FaChild />
            </PointerEvents>
            키즈
          </button>
        </SwiperSlides>
        <SwiperSlides>
          <button value="mansion" key="mansionButton" onClick={clickIcon}>
            <PointerEvents>
              <GiCastle />
            </PointerEvents>
            저택
          </button>
        </SwiperSlides>
        <SwiperSlides>
          <button value="private" key="privateButton" onClick={clickIcon}>
            <PointerEvents>
              <GiPrivate />
            </PointerEvents>
            개인실
          </button>
        </SwiperSlides>
        <SwiperSlides>
          <button value="cliff" key="cliffButton" onClick={clickIcon}>
            <PointerEvents>
              <GiSeaCliff />
            </PointerEvents>
            전망
          </button>
        </SwiperSlides>
        <SwiperSlides>
          <button value="popularity" key="popularityButton" onClick={clickIcon}>
            <PointerEvents>
              <GiThumbUp />
            </PointerEvents>
            인기
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="Ryokan" key="RyokanButton" onClick={clickIcon}>
            <GiJapan />
            료칸
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button
            value="countrySide"
            key="countrySideButton"
            onClick={clickIcon}
          >
            <PointerEvents>
              <GiFarmer />
            </PointerEvents>
            시골
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="park" key="parkButton" onClick={clickIcon}>
            <PointerEvents>
              <GiParkBench />
            </PointerEvents>
            국립공원
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button
            value="swimmingPool"
            key="swimmingPoolButton"
            onClick={clickIcon}
          >
            <PointerEvents>
              <FaSwimmingPool />
            </PointerEvents>
            수영장
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="Luxe" key="LuxeButton" onClick={clickIcon}>
            <PointerEvents>
              <GiSparkles />
            </PointerEvents>
            Luxe
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="design" key="designButton" onClick={clickIcon}>
            <PointerEvents>
              <GiAbdominalArmor />
            </PointerEvents>
            디자인
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="castle" key="castleButton" onClick={clickIcon}>
            <GiElvenCastle /> 캐슬
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="camping" key="campingButton" onClick={clickIcon}>
            <GiCampingTent />
            캠핑장
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="mini" key="miniButton" onClick={clickIcon}>
            <FiMinimize2 />
            소형주택
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="castle" key="castleButton" onClick={clickIcon}>
            <GiElvenCastle /> 캐슬
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="camping" key="campingButton" onClick={clickIcon}>
            <GiCampingTent />
            캠핑장
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="mini" key="miniButton" onClick={clickIcon}>
            <FiMinimize2 />
            소형주택
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="farm" key="farmButton" onClick={clickIcon}>
            <GiFarmTractor />
            농장
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="city" key="cityButton" onClick={clickIcon}>
            <FaCity />
            상징적 도시
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="boat" key="boatButton" onClick={clickIcon}>
            <GiFishingBoat />
            보트
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="new" key="newButton" onClick={clickIcon}>
            <GiNewBorn />
            신규
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="cabin" key="cabinButton" onClick={clickIcon}>
            <GiWoodCabin />
            통나무집
          </button>
        </SwiperSlides>

        <SwiperSlides>
          <button value="tropical" key="tropicalButton" onClick={clickIcon}>
            <GiTropicalFish />
            열대지역
          </button>
        </SwiperSlides>
      </Swipers>
    </Body>
  );
}

export default MainPageHeader;

const Body = styled.div`
  position: relative;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Swipers = styled(Swiper)`
  width: 100%;
  margin-bottom: 20px;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: rgba(0, 0, 0, 0.8);
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
    margin: 5px 20px;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s ease-out;

    svg {
      font-size: 28px;
      margin-bottom: 8px;
    }

    &:hover {
      color: #222;
      transform: scale(1.05);
      transition: all 0.2s ease-in;
    }
  }
`;

const SwiperSlides = styled(SwiperSlide)`
  width: auto !important;
`;

const PointerEvents = styled.div`
  pointer-events: none;
`;

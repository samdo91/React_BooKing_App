import { Swiper, SwiperSlide } from "swiper/react";
import styled from "@emotion/styled";
// Import Swiper styles

import React, { useRef, useState } from "react";
// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styled.css";

// import required modules
import { FreeMode, Pagination } from "swiper";

function MainPageHeader() {
  return (
    <Body>
      <Swipers
        slidesPerView={10}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlides></SwiperSlides>
        <SwiperSlides></SwiperSlides>
        <SwiperSlides></SwiperSlides>
        <SwiperSlides></SwiperSlides>
        <SwiperSlides></SwiperSlides>
        <SwiperSlides></SwiperSlides>
        <SwiperSlides></SwiperSlides>
        <SwiperSlides></SwiperSlides>
        <SwiperSlides></SwiperSlides>
        <SwiperSlides></SwiperSlides>
        <SwiperSlides></SwiperSlides>
        <SwiperSlides></SwiperSlides>
        <SwiperSlides></SwiperSlides>
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
  font-size: 7px;
  background: #ffffff;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

import { Swiper, SwiperSlide } from "swiper/react";
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
  return (
    <Body>
      <Swipers
        navigation={true}
        slidesPerView={10}
        spaceBetween={30}
        freeMode={true}
        pagination={true}
        modules={[FreeMode, Navigation]}
        className="mySwiper"
      >
        <SwiperSlides>1</SwiperSlides>
        <SwiperSlides>2</SwiperSlides>
        <SwiperSlides>3</SwiperSlides>
        <SwiperSlides>4</SwiperSlides>
        <SwiperSlides>5</SwiperSlides>
        <SwiperSlides>6</SwiperSlides>
        <SwiperSlides>7</SwiperSlides>
        <SwiperSlides>8</SwiperSlides>
        <SwiperSlides>9</SwiperSlides>
        <SwiperSlides>10</SwiperSlides>
        <SwiperSlides>11</SwiperSlides>
        <SwiperSlides>12</SwiperSlides>
        <SwiperSlides>13</SwiperSlides>
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
  width: 20px;
  justify-content: center;
  align-items: center;
  background-color: red;
`;

import React from "react";
import styled from "@emotion/styled";

function TypeSection(props) {
  const { type, setType } = props;
  // perk 리스트만듬
  const CATEGORY_LIST = [
    { id: 0, typeName: "한옥", icon: "AiOutlineWifi", value: "koreaHome" },
    { id: 1, typeName: "깜짝!", icon: false, value: "surprise" },
    { id: 2, typeName: "해변", icon: false, value: "sea" },
    { id: 3, typeName: "키즈", icon: "AiOutlineCar", value: "child" },
    { id: 4, typeName: "저택", icon: false, value: "mansion" },
    { id: 5, typeName: "개인실", icon: false, value: "private" },
    { id: 6, typeName: "열대저택", icon: false, value: "tropical" },
    { id: 7, typeName: "전망", icon: false, value: "cliff" },
    { id: 8, typeName: "인기", icon: false, value: "popularity" },
    { id: 9, typeName: "료칸", icon: false, value: "Ryokan" },
    { id: 10, typeName: "시골", icon: false, value: "countrySide" },
    { id: 11, typeName: "국립공원", icon: false, value: "park" },
    { id: 12, typeName: "수영장", icon: false, value: "swimmingPool" },
    { id: 13, typeName: "LUXE", icon: false, value: "Luxe" },
    { id: 14, typeName: "디자인", icon: false, value: "design" },
    { id: 15, typeName: "캐슬", icon: false, value: "castle" },
    { id: 16, typeName: "캠핑장", icon: false, value: "camping" },
    { id: 17, typeName: "소형주택", icon: false, value: "mini" },
    { id: 18, typeName: "농장", icon: false, value: "farm" },
    { id: 19, typeName: "상징적도시", icon: false, value: "city" },
    { id: 20, typeName: "보트", icon: false, value: "boat" },
    { id: 21, typeName: "신규", icon: false, value: "new" },
    { id: 22, typeName: "통나무집", icon: false, value: "cabin" },
  ];

  // 체크 박스에 쓰이는 함수. 체크 이벤트를 감지하여 값을 필터 돌려 토글(빼거나 넣거나)한다
  const onCheckedElement = (checked, item) => {
    if (checked) {
      setType([...type, item]);
    } else if (!checked) {
      setType(type.filter((el) => el !== item));
    }
  };

  return (
    <TypeSectionBox>
      <H2>Type</H2>
      <p> 당신의 에어비엔비에 장점을 선택해주세요.</p>
      <TypeInput>
        {CATEGORY_LIST.map((item) => {
          const icons = item.icon;
          return (
            <Typelabel key={item.id}>
              <input
                type="checkbox"
                value={item.value}
                // onChange로 값이 변경할 때마다.  onCheckedElement 함수를 실행시킨다.
                onChange={(e) => {
                  onCheckedElement(e.target.checked, e.target.value);
                }}
                checked={type?.includes(item.value) ?? false}
              />
              {icons ? <item.icon /> : ""}

              <span>{item.typeName}</span>
            </Typelabel>
          );
        })}
      </TypeInput>
    </TypeSectionBox>
  );
}

export default TypeSection;

const H2 = styled.div`
  font-size: 25px;
  margin: 20px;
`;

const TypeSectionBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const TypeInput = styled.div`
  display: flex;
  margin: 10px;
  flex-wrap: wrap;
`;

const Typelabel = styled.label`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  font-size: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid #dcdcdc;
  height: 50px;
  width: 200px;
`;

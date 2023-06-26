import React from "react";
import styled from "@emotion/styled";
import {
  AiOutlineCloudUpload,
  AiOutlineWifi,
  AiOutlineCar,
} from "react-icons/ai";

function PerksSection(props) {
  const { perks, setPerks } = props;
  // perk 리스트만듬

  const CATEGORY_LIST = [
    { id: 0, value: "wifi", icon: AiOutlineWifi }, // Use the imported icon component directly
    { id: 1, value: "TV", icon: false },
    { id: 2, value: "Pets", icon: false },
    { id: 3, value: "Free parking spot", icon: AiOutlineCar }, // Use the imported icon component directly
    { id: 4, value: "라디오", icon: false },
    { id: 5, value: "드라이기", icon: false },
  ];

  // 체크 박스에 쓰이는 함수. 체크 이벤트를 감지하여 값을 필터 돌려 토글(빼거나 넣거나)한다
  const onCheckedElement = (checked, item) => {
    if (checked) {
      setPerks([...perks, item]);
    } else if (!checked) {
      setPerks(perks.filter((el) => el !== item));
    }
  };

  return (
    <PerksSectionBox>
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
                // onChange로 값이 변경할 때마다.  onCheckedElement 함수를 실행시킨다.
                onChange={(e) => {
                  onCheckedElement(e.target.checked, e.target.value);
                }}
                checked={perks?.includes(item.value) ?? false}
              />
              {icons ? <item.icon /> : ""}
              <span>{item.value}</span>
            </Perkslabel>
          );
        })}
      </PerksInput>
    </PerksSectionBox>
  );
}

export default PerksSection;
const H2 = styled.div`
  font-size: 25px;
  margin: 20px;
`;

const PerksSectionBox = styled.div`
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
  width: 200px;
`;

// 수정된 코드:
// 1. 컴포넌트 이름인 `Perkslabel`을 `PerksLabel`로 수정하였습니다.
// 2. `AiOutlineWifi`와 `AiOutlineCar`를 `react-icons/ai`에서 불러오도록 수정하였습니다.
// 3. `{icons ? <item.icon /> : ""}` 부분을 `{Icon ? <Icon /> : null}`로 수정하였습니다.
// 4. `checked={accommodationPerks.includes(item.value) ? true : false}` 부분을 `checked={accommodationPerks.includes(item.value)}`로 수정하였습니다.
// 5. 오탈자를 수정하였습니다.

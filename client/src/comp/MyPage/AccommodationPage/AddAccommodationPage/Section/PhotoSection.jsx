import React, { useRef } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash3, BsStar, BsStarFill } from "react-icons/bs";

function PhotoSection(props) {
  const {
    accommodationPhotos,
    setAccommodationPhotos,
    photosLinks,
    setPhotosLinks,
  } = props;

  const photoInput = useRef(null);

  // 사진 업로드 함수
  const photoUpload = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    const filesData = new FormData();

    for (let i = 0; i < files.length; i++) {
      filesData.append("photos", files[i]);
    }

    await axios
      .post(`${import.meta.env.PROXY_SERVER}/photosUploads`, filesData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const links = response.data;
        setAccommodationPhotos([...accommodationPhotos, ...links]);
      });
  };

  // 링크로 사진 추가 함수
  const photoLinkButton = async (e) => {
    e.preventDefault();

    if (photosLinks === "") {
      alert("링크를 등록해주세요.");
    } else {
      const { data: filename } = await axios.post(
        `${import.meta.env.PROXY_SERVER}/photoLink`,
        {
          link: photosLinks,
        }
      );

      setAccommodationPhotos([...accommodationPhotos, filename]);
      setPhotosLinks("");
    }
  };

  // 체크 박스에 쓰이는 함수. 체크 이벤트를 감지하여 값을 필터 돌려 토글(빼거나 넣거나)한다
  const onCheckedElement = (checked, item) => {
    if (checked) {
      setAccommodationPhotos([...accommodationPhotos, item]);
    } else if (!checked) {
      setAccommodationPhotos(accommodationPhotos.filter((el) => el !== item));
    }
  };

  return (
    <PhotoSectionBox>
      {/* 기존 주석 유지 */}
      <H2>photos</H2>
      <p>
        사진을 추가해주세요. 링크를 등록하려면 "링크추가!" 컴퓨터 안의 사진을
        추가하려면 "사진+"를 눌러주세요
      </p>
      <PhotoLink>
        <div>
          <Input
            type="text"
            placeholder="인터넷 링크 사진을 가지고 있다면 사진을 등록하세요."
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
        <PhotoInput ref={photoInput} type="file" onChange={photoUpload} />
        <Flex>
          <AiOutlineCloudUpload />
          사진 +
        </Flex>
      </PhotoLabel>
      <PhotoZone>
        <PhotoList>
          <PerksInput>
            {accommodationPhotos.map((item) => {
              return (
                <PerksLabel key={item}>
                  <input
                    type="checkbox"
                    value={item}
                    onChange={(e) => {
                      onCheckedElement(e.target.checked, e.target.value);
                    }}
                    checked={accommodationPhotos.includes(item)}
                  />
                  <span>{item}</span>
                </PerksLabel>
              );
            })}
          </PerksInput>
        </PhotoList>

        <h3>여기서 등록된 사진을 볼 수 있습니다.</h3>
        <PhotoZoneBoard length={accommodationPhotos.length}>
          {accommodationPhotos.map((link, index) => {
            return (
              <SamplePhotosBox key={link}>
                {index === 0 ? (
                  <StarFill />
                ) : (
                  <Star
                    onClick={() => {
                      setAccommodationPhotos((prevArr) => {
                        const index = prevArr.indexOf(link);
                        const elem = prevArr[index];
                        const newArr = [...prevArr];
                        newArr.splice(index, 1);
                        newArr.unshift(elem);
                        return newArr;
                      });
                    }}
                  />
                )}
                <Trash
                  onClick={() => {
                    setAccommodationPhotos((prevPhotos) => {
                      return [
                        ...prevPhotos.slice(0, index),
                        ...prevPhotos.slice(index + 1),
                      ];
                    });
                  }}
                />
                <SamplePhotos src={`http://localhost:4000/${link}`} />
              </SamplePhotosBox>
            );
          })}
        </PhotoZoneBoard>
      </PhotoZone>
    </PhotoSectionBox>
  );
}

export default PhotoSection;

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
  background-color: white;
`;

const PhotoInput = styled.input`
  display: none;
  ::file-selector-button {
    display: none;
  }
`;

const PhotoSectionBox = styled.div`
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

const PhotoList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #dcdcdc;
  height: 300px;
`;

const PhotoZoneBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: ${(props) => Math.ceil(props.length / 3) * 300}px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  align-items: center;
`;

const SamplePhotos = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 10px;
  margin: 15px;
`;

const SamplePhotosBox = styled.div`
  position: relative;
  display: inline-block;
`;

const Input = styled.input`
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px gray;
  border: 1px solid #dcdcdc;
  margin: 15px;
  width: 800px;
`;

const PerksInput = styled.div`
  display: flex;
  margin: 10px;
  flex-wrap: wrap;
`;

const PerksLabel = styled.label``;

const Trash = styled(BsTrash3)`
  position: absolute;
  right: 30px;
  bottom: 30px;
  color: red;
`;

const Star = styled(BsStar)`
  position: absolute;
  top: 30px;
  left: 30px;
  color: yellow;
`;

const StarFill = styled(BsStarFill)`
  position: absolute;
  top: 30px;
  left: 30px;
  color: yellow;
`;

const Flex = styled.div`
  display: flex;
`;

/* PerksInput 컴포넌트를 PerksLabel로 수정하였습니다.
PhotoZoneBorad를 PhotoZoneBoard로 수정하였습니다.
PhotoZoneBoard 컴포넌트의 height 값을 계산하는 부분을 수정하였습니다.
PerksLabel 컴포넌트에 key 속성을 추가하였습니다.
onChange 이벤트 핸들러에서 체크 여부를 확인하는 부분을 간략화하였습니다.
변경 사항:*/

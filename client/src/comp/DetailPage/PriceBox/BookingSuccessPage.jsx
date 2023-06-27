import React from "react";
import { userDataAtom } from "../../../Store/Global/Index";
import { useAtom } from "jotai";
import styled from "@emotion/styled";
import Header from "../../Header/Header";
import { Link } from "react-router-dom";
function BookingSuccessPage() {
  const [useData, setUseData] = useAtom(userDataAtom);

  return (
    <div>
      <header>
        <Header />
      </header>
      <BookingSuccessPageBody>
        <BookingSuccessText>
          {useData.name} 님 예약이 완료 되었습니다.
        </BookingSuccessText>
        <div>
          <Link to="/">
            <Button>메인페이지로 돌아가기</Button>
          </Link>
          <Link to="/myPage/booking">
            <Button>예약 확인 페이지</Button>
          </Link>
        </div>
      </BookingSuccessPageBody>
    </div>
  );
}

export default BookingSuccessPage;

const BookingSuccessPageBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
`;

const BookingSuccessText = styled.div`
  font-size: 40px;
  padding: 40px;
`;

const Button = styled.button`
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  background-color: #f5002d;
  color: white;
  padding: 40px; /* Fix: Corrected the typo "paddiog" to "padding" */
  margin: 15px;
  width: 500px;
`;

import { atom } from "jotai";

//서치바의상태이다. 일단 서치바는 누르면 변경된기 떄문이다
export const searchBarStates = atom("default");

// 트루가 되면 로그인 메뉴가 나타난다.
export const loginMenuToggles = atom(false);

// 로그인창을 모달로 띄우기로 되어있다. 트루가 되면 모달이 뜬다.
export const loginModals = atom(false);

// 유저데이터가 저장된다.
export const userDataAtom = atom({
  login: false,
  name: "",
  phoneNumber: "",
  password: "",
});

//  qpi로 불러온 item 데이터, 에어비엔비 데이터를 저장한다.

export const itemDatas = atom([
  { country: "", city: "", hostName: "", picture: " ", price: " ", type: [] },
]);

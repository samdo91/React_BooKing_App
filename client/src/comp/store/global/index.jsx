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
  token: false,
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  countryCode: "",
});

//  주의!!! 이게 원본이다. 이 데이터를 임의로 수정하지 말것!! qpi로 불러온 item 데이터, 에어비엔비 데이터를 저장한다.
export const itemDatas = atom([
  { country: "", city: "", hostName: "", picture: " ", price: " ", type: [] },
]);
// 이게 필터 관리에 사용되는 itemData다. 이걸 씹고뜯고맛보고 즐기자.
export const itemDataLists = atom([
  { country: "", city: "", hostName: "", picture: " ", price: " ", type: [] },
]);

// 더 이상 노출할 에어비앤비가 없다면?
export const zoroItems = atom(false);

// 로그인이 되어 있는가?
export const loginStates = atom(false);

//

import { atom } from "jotai";

export const searchBarStates = atom("default");

export const loginMenuToggles = atom(false);

export const loginModals = atom(false);

export const userDatas = atom({
  login: false,
  name: "",
  phoneNumber: "",
  password: "",
});

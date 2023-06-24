import { createBrowserRouter } from "react-router-dom";
import MainPage from "../comp/MainPage/MainPage";
import LoginPage from "../comp/LoginPage/LoginPage";
import DetailPage from "../comp/DetailPage/PetailPage";
import RegisterPage from "../comp/registerPage/registerPage";
import MyPage from "../comp/MyPage/MyPage";
import AccountPage from "../comp/MyPage/AccountPage/AccountPage";
import PrivacyPage from "../comp/MyPage/AccountPage/PrivacyPage/PrivacyPage";
import AccommodationPage from "../comp/MyPage/AccommodationPage/AccommodationPage";
import AddAccommodationPage from "../comp/MyPage/AccommodationPage/AddAccommodationPage/AddAccommodationPage";
import BookingPage from "../comp/MyPage/BookingPage/BookingPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/Loginpage",
    element: <LoginPage />,
  },
  {
    path: `/detailPage/:id`,
    element: <DetailPage />,
  },
  {
    path: `/register`,
    element: <RegisterPage />,
  },
  {
    path: `/myPage`,
    element: <MyPage />,
  },
  {
    path: "/myPage/Account",
    element: <AccountPage />,
  },
  {
    path: "/myPage/Account/privacy",
    element: <PrivacyPage />,
  },
  {
    path: "/myPage/MyAccommodation",
    element: <AccommodationPage />,
    children: [
      {
        path: "add",
        element: <AddAccommodationPage />,
      },
      {
        path: "add/:id",
        element: <AddAccommodationPage />,
      },
    ],
  },
  {
    path: `/myPage/booking`,
    element: <BookingPage />,
  },
]);

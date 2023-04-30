import { createBrowserRouter } from "react-router-dom";
import MainPage from "../../mainPage/mainPage";
import LoginPage from "../../loginPage/loginPage";
import DetailPage from "../../detailPage/detailPage";
import RegisterPage from "../../registerPage/registerPage";
import MyPage from "../../myPage/myPage";
import AccountPage from "../../myPage/accountpage/accountPage";
import PrivacyPage from "../../myPage/accountPage/PrivacyPage/PrivacyPage";
import AcommodatonPage from "../../myPage/acommodatonPage/acommodatonPage";
import AddAcommodatonPage from "../../myPage/acommodatonPage/addAcommodatonPage/addAcommodatonPage.";
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
    path: `detailPage/:id`,
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
    path: `/myPage/Acommodaton`,
    element: <AcommodatonPage />,
    children: [
      {
        path: "/myPage/Acommodaton/add",
        element: <AddAcommodatonPage />,
      },
      {
        path: "/myPage/Acommodaton/add/:id",
        element: <AddAcommodatonPage />,
      },
    ],
  },
]);

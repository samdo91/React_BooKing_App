import { createBrowserRouter } from "react-router-dom";
import MainPage from "../../mainPage/mainPage";
import LoginPage from "../../loginPage/loginPage";
import DetailPage from "../../detailPage/detailPage";
import RegisterPage from "../../registerPage/registerPage";
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
    path: `/:hostName`,
    element: <DetailPage />,
  },
  {
    path: `/register`,
    element: <RegisterPage />,
  },
]);

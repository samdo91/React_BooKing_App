import { createBrowserRouter } from "react-router-dom";
import MainPage from "../../mainPage/mainPage";
import LoginPage from "../../loginPage/loginPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/Loginpage",
    element: <LoginPage />,
  },
]);

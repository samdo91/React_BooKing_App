import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Router";
import { Provider } from "jotai";
import axios from "axios";
import styled from "@emotion/styled";

axios.defaults.withCredentials = true;
function App() {
  return (
    <Apps>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </Apps>
  );
}

export default App;

const Apps = styled.div`
  margin-left: 60px;
  margin-right: 60px;
`;

import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./comp/store/router/router.jsx";
import { Provider } from "jotai";
import axios from "axios";

axios.defaults.withCredentials = true;
function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./comp/store/router/router.jsx";
import { Provider } from "jotai";
function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

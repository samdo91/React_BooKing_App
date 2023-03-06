import "./App.css";
import Header from "./comp/header/header";
import MainPage from "./comp/mainPage/mainPage";
import { Provider } from "jotai";
function App() {
  return (
    <Provider>
      <Header />
    </Provider>
  );
}

export default App;

import ReactDOM from "react-dom/client";
import App from "./app";
import { Provider } from "react-redux";
import store from "./Services/Store/index";
import "./Assets/Styles/global.scss";
import "./Assets/Styles/index.css";
import InitAxios from "./initAxios";
import { Toaster } from "react-hot-toast";
/**
  * <summary>
  * initializes and renders a React application:
  * </summary>
  * <param name="root">
  * </param> 
  * <returns>
  * Create a React root and render it into an HTML element with the ID "root."
  * </returns> 
  */
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <InitAxios>
    <Toaster position="top-right"/>
      <App />
    </InitAxios>
  </Provider>
);

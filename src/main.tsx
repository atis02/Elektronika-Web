import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/globalStyles.css";
import "./language/i18n";
import { Provider } from "react-redux";
import store from "./components/redux/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);

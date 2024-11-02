import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./Redux/store";

createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <StrictMode>{<App />}</StrictMode>
    </Provider>
  </PersistGate>
);

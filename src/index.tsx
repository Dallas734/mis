import ReactDOM from "react-dom/client";
import "./app/styles/index.scss";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./app/providers/StoreProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>
);

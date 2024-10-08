import ReactDOM from "react-dom/client";
import "./app/styles/index.scss";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./app/providers/StoreProvider";
import { AuthProvider } from "./app/providers/AuthProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import { Toaster } from "react-hot-toast";
import { MUIThemeProvider } from "./app/providers/MUIThemeProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <StoreProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <MUIThemeProvider>
          <AuthProvider>
            <App />
            <Toaster />
          </AuthProvider>
        </MUIThemeProvider>
      </LocalizationProvider>
    </StoreProvider>
  </BrowserRouter>
);

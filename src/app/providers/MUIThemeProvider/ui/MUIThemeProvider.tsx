import { ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";
import { theme } from "../config/MUIThemeConfig";

interface MUIThemeProviderProps {
  children?: ReactNode;
}

export const MUIThemeProvider = (props: MUIThemeProviderProps) => {
  const { children } = props;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "green",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "green",
            },
          },
        },
      },
    },
  });
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#424242",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily: "Arial, sans-serif",
  },

  shape: {
    borderRadius: 8,
  },
});

export default theme;
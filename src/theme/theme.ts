import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1c2434",
    },
    secondary: {
      main: "#fff",
    },
    background: {
      default: "#f1f5f9",
    },
    action: {
      active: "#3c50e0",
    },
    text: {
      primary: "#1c2434",
      secondary: "#9d9d9d",
    },
    success: {
      main: "#34D399",
    },
  },
  typography: {
    fontFamily: "var(--font-open-sans), sans-serif",
  },
});

export default theme;

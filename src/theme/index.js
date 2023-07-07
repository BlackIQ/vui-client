import { createTheme, colors } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#f1f1f1",
    },
    primary: {
      main: colors.blue[500],
    },
  },
  typography: {
    fontFamily: "Vazirmatn",
  },
});

export default theme;

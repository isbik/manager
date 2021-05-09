import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {
  createMuiTheme,
  ThemeOptions,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useStore } from "effector-react";
import React from "react";
import { $theme } from "../components/TheDrawer/state";

const commonTheme: ThemeOptions = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        a: {
          textDecoration: "none",
          color: "inherit",
        },
        "*::-webkit-scrollbar": {
          width: "0.1em",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 2px rgba(0,0,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.5)",
        },
        ".none-outline": {
          outline: "none",
        },
        ".placeholder": {
          "&[contenteditable][placeholder]:empty:before": {
            content: "attr(placeholder)",
            position: "absolute",
            color: "gray",
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
};
const light: ThemeOptions = {
  palette: {
    type: "light",
  },
  ...commonTheme,
};

const dark: ThemeOptions = {
  palette: {
    type: "dark",
  },
  ...commonTheme,
};

const Empty = ({ children }) => {
  const theme = useStore($theme);

  const appliedTheme = createMuiTheme(theme ? light : dark);

  return (
    <ThemeProvider theme={appliedTheme}>
      {/* <ClipboardModal /> */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default Empty;

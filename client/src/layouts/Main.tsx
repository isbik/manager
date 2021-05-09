import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {
  createMuiTheme,
  makeStyles,
  Theme,
  ThemeOptions,
  ThemeProvider
} from "@material-ui/core/styles";
import clsx from "clsx";
import { useStore } from "effector-react";
import React from "react";
import { TheDrawer } from "../components/TheDrawer";
import { $drawer, $theme } from "../components/TheDrawer/state";
import { $backroundColor } from "../store";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  },
  contentOpen: {
    overflow: "hidden",
    height: "100vh",
  },
}));

const commonTheme: ThemeOptions = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*": {
          scrollbarColor: "#1a1144",
          scrollbarWidth: "thin",
        },
        a: {
          textDecoration: "none",
          color: "inherit",
        },
        "*::-webkit-scrollbar": {
          width: "0.1em",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb": {
          height: 30,
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

export default function Main({ children }) {
  const classes = useStyles();
  const drawer = useStore($drawer);
  const theme = useStore($theme);
  const backgroundColor = useStore($backroundColor)
  const appliedTheme = createMuiTheme(theme ? light : dark);

  return (
    <ThemeProvider theme={appliedTheme}>
      {/* <ClipboardModal /> */}
      <div className={clsx(classes.root, { [classes.contentOpen]: drawer })}>
        <CssBaseline />
        <TheDrawer />
        <main
          style={{ backgroundColor: backgroundColor }}
          className={classes.content}>{children}</main>
      </div>
    </ThemeProvider>
  );
}

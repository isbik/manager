import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {
  createMuiTheme,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core/styles";
import clsx from "clsx";
import { useStore } from "effector-react";
import React from "react";
import { TheDrawer } from "../components/TheDrawer";
import { $drawer, $theme } from "../components/TheDrawer/state";
import { $backroundColor } from "../store";
import { dark, light } from "../theme";

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

export default function Main({ children }) {
  const classes = useStyles();
  const drawer = useStore($drawer);
  const theme = useStore($theme);
  const backgroundColor = useStore($backroundColor);
  const appliedTheme = createMuiTheme(theme ? light : dark);

  return (
    <ThemeProvider theme={appliedTheme}>
      {/* <ClipboardModal /> */}
      <div className={clsx(classes.root, { [classes.contentOpen]: drawer })}>
        <CssBaseline />
        <TheDrawer />
        <main
          style={{ backgroundColor: backgroundColor }}
          className={classes.content}
        >
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}

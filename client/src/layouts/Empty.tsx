import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useStore } from "effector-react";
import React from "react";
import { $theme } from "../components/TheDrawer/state";
import { dark, light } from "../theme";

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

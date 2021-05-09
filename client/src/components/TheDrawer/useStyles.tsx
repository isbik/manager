import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { drawerWidth } from "./index";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
      overflowX: "hidden",
      height: "100vh",
    },
    drawerOpen: {
      width: drawerWidth,
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      maxWidth: "calc(100vw - 60px)",
    },
    contentOpen: {
      overflow: "hidden",
      height: "100vh",
    },
    menuIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme: Theme) => ({
  days: {
    overflow: "scroll",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  day: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "3px solid",
    borderColor: theme.palette.divider,
    padding: theme.spacing(1),
    paddingTop: 5,
    paddingBottom: 5,
    width: "auto",
    minWidth: "60px",
    borderRight: "none",
    cursor: "pointer",
    transition: "all 0.3s",
    flexGrow: 1,

    "&:first-child": {
      borderLeft: "none",
    },
  },
  dayActive: {
    borderColor: "transparent",
    background: theme.palette.success.light,
    color: theme.palette.common.white,
  },
  dayDisabled: {
    background: theme.palette.background.paper,
    opacity: 0.6,
    pointerEvents: "none",
  },
  today: {
    color: theme.palette.info.main,
  },
}));

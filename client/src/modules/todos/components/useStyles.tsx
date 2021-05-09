import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  todo: {
    borderTop: "1px solid",
    borderBottom: "1px solid",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    width: "100%",
    "&:hover": {
      borderColor: theme.palette.divider,
    },
    "&:last-child": {
      borderBottom: "none !important",
    },
  },
  toggle: {
    transition: "all 0.5s",
  },
  toggleOpen: {
    transform: "rotate(90deg)",
  },
}));

import { makeStyles, Theme } from "@material-ui/core";

export interface StyleProps {
  color?: string;
}
export const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  listItem: {
    padding: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  listItemCount: {
    marginLeft: theme.spacing(1.5),
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: "0.75rem",
    fontWeight: "bold",
    background: "transparent",
    color: theme.palette.text.primary,
    border: "3px solid",
    borderColor: (props) => props.color,
  },
  listItemIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    border: "2px solid",
    "& span": {
      fontSize: "0.8rem",
    },
  },
  settingIcon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    background: theme.palette.background.paper,
    "&:hover": {
      background: theme.palette.success.main,
    },
  },
}));

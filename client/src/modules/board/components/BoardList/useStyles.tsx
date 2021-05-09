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
    marginLeft: theme.spacing(2),
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: "0.75em",
    fontWeight: "bold",
    textAlign: "center",
    background: (props) => props.color,
    color: theme.palette.text.primary,
  },

  listItemIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    "min-width": "auto",
    border: "1px solid",
    "& span": {
      fontSize: "1rem",
    },
  },

  settingButton: {
    width: theme.spacing(4),
    "min-width": "auto",
    height: theme.spacing(4),
    marginRight: theme.spacing(2),
    background: theme.palette.success.light,
    "&:hover": {
      background: theme.palette.success.main,
    },
  },
}));

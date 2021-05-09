import { createStyles, Theme } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "auto",
      padding: theme.spacing(1),
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      "& input": {
        padding: 0,
      },
    },
    iconButton: {
      padding: theme.spacing(0.5),
      "& span": {
        fontSize: "18px",
      },
    },
    divider: {
      height: 28,
      margin: 4,
    },
    color: {
      marginRight: theme.spacing(2),
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  })
);

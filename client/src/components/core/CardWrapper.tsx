import {
  Box,
  Card,
  Icon,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    position: "relative",
    "&:hover $actions": {
      opacity: 1,
    },
    marginBottom: theme.spacing(2),
    overflow: "visible",
  },
  actions: {
    transition: "all 0.3s",
    opacity: 0,
  },
  actionIcon: {
    borderRadius: theme.shape.borderRadius,
    height: "28px",
    width: "28px",
  },
}));

interface ICardWrapper {
  children: React.ReactNode;
  deleteCard: Function;
  dense?: boolean;
}
export const CardWrapper: React.FC<ICardWrapper> = ({
  children,
  deleteCard,
  dense,
}) => {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.card}>
      <Box p={dense ? 0 : 1}>{children}</Box>
      <Box className={classes.actions}>
        <IconButton onClick={() => deleteCard()} className={classes.actionIcon}>
          <Icon>close</Icon>
        </IconButton>
      </Box>
    </Card>
  );
};

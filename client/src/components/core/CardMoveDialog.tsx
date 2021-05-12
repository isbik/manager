import {
  Box,
  Button,
  Card,
  makeStyles,
  Popover,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  selectBoard: {
    marginBottom: theme.spacing(1),
    "&  .MuiIconButton-root": {
      padding: theme.spacing(0.5),
    },
  },
}));

export const CardMoveDialog = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Card>
        <Box p={2} display="flex" flexDirection="column">
          <Typography variant="h6" gutterBottom>
            Выберите доску для перемещения
          </Typography>
          <Autocomplete
            options={[]}
            id="disable-list-wrap"
            disableListWrap
            className={classes.selectBoard}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.selectBoard}
                placeholder="Доска"
                variant="outlined"
              />
            )}
          />
          <Button variant="contained" color="primary">
            Выбрать
          </Button>
        </Box>
      </Card>
    </Popover>
  );
};

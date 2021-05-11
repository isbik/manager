import {
  Avatar,
  Box,
  Collapse,
  createStyles,
  Icon,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { useStore } from "effector-react";
import React, { useEffect, useState } from "react";
import { $drawer, $toggleDrawer } from "../../../components/TheDrawer/state";
import { createBoard } from "../../../services/API/board";
import { $addBoard, $boardName, $setBoardName } from "../state";
import { IBoard } from "./BoardList/index";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      margin: "0 10px",
      width: "100%",
    },
    input: {
      flex: 1,
    },
    iconButton: {
      padding: theme.spacing(1),
    },
    color: {
      marginRight: theme.spacing(1),
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  })
);

interface Props {
  handleSearch: (string) => void;
}

const colors = [
  "#ff4a4a",
  "#fcbe4a",
  "#7cefbd",
  "#3ec0fd",
  "#a658ff",
  "#fa52bd",
];

export const AddBoardItem: React.FC<Props> = ({ handleSearch }) => {
  const classes = useStyles();
  const drawer = useStore($drawer);
  const boardName = useStore($boardName);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedColor, setSelectedColor] = React.useState(colors[0]);

  useEffect(() => {
    if (!isAdd) {
      handleSearch(boardName);
    }
  }, [boardName]);

  const addBoard = () => {
    createBoard({ name: boardName, color: selectedColor }).then((response) => {
      $addBoard({ ...response.data, cards_count: 0 });
    });

    $setBoardName("");

    setIsAdd(false);
  };

  const setAddNewBoard = () => {
    $toggleDrawer();
    setIsAdd(true);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        px={2}
      >
        {drawer ? (
          <>
            <Paper
              variant="outlined"
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                isAdd ? addBoard() : handleSearch(boardName);
              }}
              className={classes.root}
            >
              <IconButton
                onClick={() => setIsAdd(false)}
                className={classes.iconButton}
                disabled={!isAdd}
              >
                {isAdd ? <Icon>close</Icon> : <Icon>search</Icon>}
              </IconButton>
              <InputBase
                value={boardName}
                onChange={(e) => $setBoardName(e.target.value)}
                className={classes.input}
                placeholder={isAdd ? "Название доски" : "Поиск..."}
                inputProps={{ "aria-label": "search google maps" }}
              />
              {isAdd ? (
                <IconButton
                  disabled={!boardName}
                  onClick={addBoard}
                  className={classes.iconButton}
                >
                  <Icon>check</Icon>
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => setIsAdd(!isAdd)}
                  className={classes.iconButton}
                >
                  <Icon>add</Icon>
                </IconButton>
              )}
            </Paper>
          </>
        ) : (
          <IconButton onClick={setAddNewBoard} className={classes.iconButton}>
            <Icon>add</Icon>
          </IconButton>
        )}
      </Box>
      <Collapse in={isAdd && drawer} mountOnEnter unmountOnExit>
        <Box px={2} mt={2} display="flex">
          {colors.map((color) => (
            <Avatar
              style={{
                backgroundColor: color,
                marginRight: 10,
                width: 30,
                height: 30,
                cursor: "pointer",
              }}
              key={color}
              variant="rounded"
              onClick={() => setSelectedColor(color)}
            >
              {selectedColor === color ? (
                <Icon color="action">check</Icon>
              ) : (
                <>&nbsp;</>
              )}
            </Avatar>
          ))}
        </Box>
      </Collapse>
    </>
  );
};
export interface IBoardItemProps {
  board: IBoard;
}

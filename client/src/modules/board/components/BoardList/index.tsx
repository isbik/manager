import {
  Box,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { $drawer, $toggleDrawer } from "../../../../components/TheDrawer/state";
import { generate } from "../../../../lib/array";
import { $boards, $boardsLoading, $fetchBoards } from "../../state";
import { BoardItem } from "./BoardItem";
import { BoardItemLoading } from "./BoardItemLoading";
import { BoardTypeItem } from "./BoardTypeItem";
import { useStyles } from "./useStyles";
export interface IBoard {
  id: number;
  name: string;
  color: string;
  use_color: string;
  cards_count: number;
}

interface IBoardListProps {}

export const BoardList: React.FunctionComponent<IBoardListProps> = ({}) => {
  const boards = useStore($boards);
  const loading = useStore($boardsLoading);
  const drawer = useStore($drawer);

  useEffect(() => {
    $fetchBoards();
  }, []);

  const classes = useStyles({});

  const types = [
    {
      icon: "receipt",
      name: "Заметки",
      to: "/notes",
    },
    {
      icon: "exposure-plus-1",
      name: "Прогресс",
      to: "/goals",
    },
    {
      icon: "list",
      name: "Задачи",
      to: "/todos",
    },
    {
      name: "Привычки",
      icon: "event-note",
      to: "/habits",
    },
  ];

  return (
    <List dense style={{ paddingTop: 0 }}>
      <Box
        height="45px"
        px={drawer ? 2 : 1}
        my={2}
        display="flex"
        justifyContent="space-between"
      >
        {drawer ? (
          types.map((type) => <BoardTypeItem key={type.to} {...type} />)
        ) : (
          <IconButton
            onClick={() => $toggleDrawer()}
            style={{ width: 40, height: 40 }}
          >
            <Icon>apps</Icon>
          </IconButton>
        )}
      </Box>
      <Divider />
      {loading ? (
        <>{generate(5, <BoardItemLoading />)}</>
      ) : boards.length === 0 ? (
        drawer && (
          <ListItem
            style={{ paddingLeft: 15 }}
            button
            className={classes.listItem}
          >
            <ListItemText>Доски не найдены</ListItemText>
          </ListItem>
        )
      ) : (
        boards.map((board) => <BoardItem board={board} key={board.id} />)
      )}
    </List>
  );
};

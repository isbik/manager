import { makeStyles, Theme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Skeleton } from "@material-ui/lab";
import { useStore } from "effector-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AddNewTask from "../../components/core/CreateNewTask";
import { $drawer, $toggleDrawer } from "../../components/TheDrawer/state";
import { BoardCards } from "../../modules/board/components/BoardCards";
import {
  $addCard,
  $boardCards,
  $boards,
  $fetchBoardCards,
  $increaseBoardCardCount,
} from "../../modules/board/state";
import { HabitCRUD } from "../../services/API/habit";
import { NoteCRUD } from "../../services/API/note";
import { ProgressCRUD } from "../../services/API/progress";
import { TasksCRUD } from "../../services/API/tasks";
import { $setBackgroundColor } from "../../store";
import { TaskType } from "../../types/tasks";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    position: "relative",
    "&:hover $actions": {
      display: "block",
    },
  },
  actions: {
    zIndex: 1,
    display: "none",
  },
  actionIcon: {
    borderRadius: theme.shape.borderRadius,
    height: "38px",
    width: "38px",
    "&:hover": {
      background: red[300],
    },
  },
}));

const CREATE_ACTION = {
  [TaskType.text]: NoteCRUD.create,
  [TaskType.list]: TasksCRUD.create,
  [TaskType.progress]: ProgressCRUD.create,
  [TaskType.habit]: HabitCRUD.create,
};

const Board = () => {
  const router = useRouter();
  const id = +router.query.id;
  const classes = useStyles();
  const drawer = useStore($drawer);
  const boardCards = useStore($boardCards);
  const boards = useStore($boards);

  const nameRef = React.useRef();

  useEffect(() => {
    if (Number.isInteger(id) && (!boardCards[id] || boardCards[id]?.hasMore)) {
      if (drawer) {
        $toggleDrawer();
      }

      $fetchBoardCards(id);
    }

    if (id) {
      const board = boards.find(({ id: board_id }) => board_id === id);
      if (board?.use_color) {
        $setBackgroundColor(board?.color || "transparent");
      }
    }
    return () => {
      $setBackgroundColor("transparent");
    };
  }, [id]);

  const addTask = (task: any) => {
    CREATE_ACTION[task.type]({ board_id: id, ...task }).then((response) => {
      $addCard({ board_id: id, data: { type: task.type, ...response.data } });
      $increaseBoardCardCount(id);
    });
  };

  return (
    <>
      <AddNewTask handleAdd={addTask} nameRef={nameRef} />
      {$fetchBoardCards.pending.getState() ? (
        <>
          <Skeleton
            style={{ marginBottom: 10 }}
            className={classes.card}
            variant="rect"
            height={40}
          ></Skeleton>
          <Skeleton
            style={{ marginBottom: 10 }}
            className={classes.card}
            variant="rect"
            height={40}
          ></Skeleton>
          <Skeleton
            style={{ marginBottom: 10 }}
            className={classes.card}
            variant="rect"
            height={40}
          ></Skeleton>
        </>
      ) : (
        <>
          <BoardCards key={id} nameRef={nameRef} />
        </>
      )}
    </>
  );
};

export default Board;

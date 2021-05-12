import {
  Box,
  Icon,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Skeleton } from "@material-ui/lab";
import { useStore } from "effector-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AddNewTask from "../../components/core/CreateNewTask";
import { $drawer, $toggleDrawer } from "../../components/TheDrawer/state";
import { generate } from "../../lib/array";
import { BoardCards } from "../../modules/board/components/BoardCards";
import {
  $addCard,
  $boardCards,
  $boardCardsLoading,
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
  const loadingCards = useStore($boardCardsLoading);

  const boards = useStore($boards);

  const nameRef = React.useRef();

  const currentBoard = React.useMemo(() => {
    return boards.find(({ id: board_id }) => board_id === id);
  }, [id, boards]);

  useEffect(() => {
    if (Number.isInteger(id) && (!boardCards[id] || boardCards[id]?.hasMore)) {
      if (drawer) {
        $toggleDrawer();
      }

      $fetchBoardCards(id);
    }

    if (id) {
      if (currentBoard?.use_color) {
        $setBackgroundColor(currentBoard?.color || "transparent");
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
      <Box display="flex" mb={1}>
        <Link href="/">
          <a>
            <IconButton style={{ alignSelf: "flex-start", marginRight: 10 }}>
              <Icon>arrow_back</Icon>
            </IconButton>
          </a>
        </Link>

        <Typography
          gutterBottom
          variant="h4"
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {currentBoard?.name}
        </Typography>

        <Link href={`/board/${id}/settings`}>
          <a style={{ alignSelf: "flex-start", marginLeft: "auto" }}>
            <IconButton>
              <Icon>settings</Icon>
            </IconButton>
          </a>
        </Link>
      </Box>
      <AddNewTask handleAdd={addTask} nameRef={nameRef} />
      {loadingCards ? (
        generate(
          5,
          <Skeleton
            style={{ marginBottom: 15, borderRadius: 5 }}
            variant="rect"
            height={63}
          />
        )
      ) : (
        <>
          <BoardCards key={id} nameRef={nameRef} />
        </>
      )}
    </>
  );
};

export default Board;

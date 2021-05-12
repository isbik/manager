import { Box, Button, Grid, Icon, Typography } from "@material-ui/core";
import { useStore } from "effector-react";
import { useRouter } from "next/router";
import React from "react";
import { CardWrapper } from "../../../components/core/CardWrapper";
import { HabitCRUD } from "../../../services/API/habit";
import { NoteCRUD } from "../../../services/API/note";
import { ProgressCRUD } from "../../../services/API/progress";
import { TasksCRUD } from "../../../services/API/tasks";
import { TaskType } from "../../../types/tasks";
import { HabitTask } from "../../habit/components/HabitTask";
import { NoteTask } from "../../note/NoteTask";
import { ProgressTask } from "../../progress/components/ProgressTask";
import { TodosTask } from "../../todos/components/TodosTask";
import {
  $boardCards,
  $decreaseBoardCardCount,
  $deleteCard,
  $fetchBoardCards,
} from "../state";

const DENSED_CARDS = [TaskType.list, TaskType.progress, TaskType.habit];

const DELETE_ACTION = {
  [TaskType.text]: NoteCRUD.delete,
  [TaskType.list]: TasksCRUD.delete,
  [TaskType.progress]: ProgressCRUD.delete,
  [TaskType.habit]: HabitCRUD.delete,
};

export const BoardCards = ({ nameRef }) => {
  const router = useRouter();
  const boardCards = useStore($boardCards);

  const id = +router.query.id;

  const TaskComponent = (task: any) => {
    return {
      [TaskType.text]: <NoteTask key={task.id} {...task} />,
      [TaskType.list]: <TodosTask key={task.id} {...task} />,
      [TaskType.progress]: <ProgressTask key={task.id} {...task} />,
      [TaskType.habit]: <HabitTask key={task.id} {...task} />,
    }[task.type];
  };

  const deleteCard = (type: TaskType, card_id: number) => {
    DELETE_ACTION[type](card_id).then(() => {
      $deleteCard({ id: card_id, board_id: id });
      $decreaseBoardCardCount(id);
    });
  };

  return (
    <>
      {boardCards[id]?.cards?.length ? (
        <Grid justify="center" container spacing={3}>
          <Grid item xs={12}>
            {(boardCards[id]?.cards || []).map((card: any) => (
              <CardWrapper
                deleteCard={() => deleteCard(card.type, card.id)}
                key={card.id}
                dense={DENSED_CARDS.includes(card.type)}
              >
                {TaskComponent(card)}
              </CardWrapper>
            ))}
          </Grid>
        </Grid>
      ) : (
        <Box
          display="flex"
          flexGrow={1}
          justifyItems="center"
          alignItems="center"
        >
          <Box margin="auto" textAlign="center">
            <Typography gutterBottom>
              {" "}
              Ещё не было добавлено карточек
            </Typography>
            <Button
              onClick={() => nameRef?.current.focus()}
              color="primary"
              variant="contained"
              startIcon={<Icon>add-circle</Icon>}
            >
              <Typography> Добавить карточку</Typography>
            </Button>
          </Box>
        </Box>
      )}
      {/* </StackGrid> */}
      {boardCards[id]?.hasMore && (
        <Button variant="outlined" onClick={() => $fetchBoardCards(id)}>
          Ещё
        </Button>
      )}
    </>
  );
};

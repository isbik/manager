import { makeStyles, Theme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { useStore } from "effector-react";
import React, { useEffect } from "react";
import AddNewTask from "../components/core/CreateNewTask";
import { CardWrapper } from "../components/core/CardWrapper";
import { ProgressTask } from "../modules/progress/components/ProgressTask";
import {
  $addProgress,
  $deleteProgress,
  $fetchProgress,
  $progress,
} from "../modules/progress/state";
import { ProgressCRUD } from "../services/API/progress";
import { TaskType } from "../types/tasks";

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
    "&:hover": {
      background: red[300],
      "& span": {
        // fontSize: "1rem",
      },
    },
  },
}));

const Board = () => {
  const classes = useStyles();
  const progressStore = useStore($progress);

  useEffect(() => {
    $fetchProgress({});
  }, []);

  const addCard = (card: any) => {
    console.log(card);

    ProgressCRUD.create(card).then((response) => {
      $addProgress(response.data);
    });
  };

  const deleteCard = (cardId: number) => {
    ProgressCRUD.delete(cardId).then(() => {
      $deleteProgress(cardId);
    });
  };

  return (
    <>
      <AddNewTask handleAdd={addCard} only={TaskType.progress} />
      {progressStore.items.map((card: any) => (
        <CardWrapper dense deleteCard={() => deleteCard(card.id)} key={card.id}>
          <ProgressTask key={card.id} {...card} />
        </CardWrapper>
      ))}
    </>
  );
};

export default Board;

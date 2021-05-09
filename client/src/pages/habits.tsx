import { useStore } from "effector-react";
import React, { useEffect } from "react";
import AddNewTask from "../components/core/CreateNewTask";
import { CardWrapper } from "../components/core/CardWrapper";
import { HabitTask } from "../modules/habit/components/HabitTask";
import {
  $addHabit,
  $deleteHabit,
  $fetchHabit,
  $habits,
} from "../modules/habit/state";
import { HabitCRUD } from "../services/API/habit";
import { TaskType } from "../types/tasks";

const HabitBoard = () => {
  const habitStore = useStore($habits);

  useEffect(() => {
    $fetchHabit({});
  }, []);

  const addCard = (card: any) => {
    HabitCRUD.create({ name: card.name }).then((response) => {
      $addHabit(response.data);
    });
  };

  const deleteCard = (card_id: number) => {
    HabitCRUD.delete(card_id).then(() => {
      $deleteHabit(card_id);
    });
  };

  return (
    <div>
      <AddNewTask handleAdd={addCard} only={TaskType.habit} />
      {habitStore.items.map((card: any) => (
        <CardWrapper
          deleteCard={() => {
            deleteCard(card.id);
          }}
          dense
          key={card.id}
        >
          <HabitTask key={card.id} {...card} />
        </CardWrapper>
      ))}
    </div>
  );
};

export default HabitBoard;

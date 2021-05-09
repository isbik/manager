import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { CardWrapper } from "../components/core/CardWrapper";
import AddNewTask from "../components/core/CreateNewTask";
import {
  $addTask,
  $deleteTask,
  $fetchTasks,
  $tasks
} from "../modules/todos/state";
import { TodosTask } from "../modules/todos/components/TodosTask";
import { TasksCRUD } from "../services/API/tasks";
import { TaskType } from "../types/tasks";

const TodosCards = () => {
  const tasksStore = useStore($tasks);
  useEffect(() => {
    $fetchTasks({});
  }, []);

  const addTask = (card: any) => {
    TasksCRUD.create({ name: card.name }).then((response) => {
      $addTask(response.data);
    });
  };

  const deleteCard = (cardId: number) => {
    TasksCRUD.delete(cardId).then(() => {
      $deleteTask(cardId);
    });
  };

  return (
    <>
      <AddNewTask handleAdd={addTask} only={TaskType.list} />
      {tasksStore.items.map((card: any) => (
        <CardWrapper deleteCard={() => deleteCard(card.id)} dense key={card.id}>
          <TodosTask key={card.id} {...card} />
        </CardWrapper>
      ))}
    </>
  );
};

export default TodosCards;

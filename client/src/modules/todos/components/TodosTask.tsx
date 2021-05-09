import {
  Box,
  Typography
} from "@material-ui/core";
import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { TodoCRUD } from "../../../services/API/todo";
import { ITodo, ITodosTask } from "../../../types/tasks";
import {
  $addTodo,
  $fetchTodos,
  $todos
} from "../todo-state";
import { CompletedTodos } from "./CompletedTodos";
import { NewTodo } from "./NewTodo";
import { ToggleTask } from "./ToggleTodo";
import { useStyles } from "./useStyles";

export const TodosTask: React.FunctionComponent<ITodosTask> = ({ id, name }) => {
  const classes = useStyles();

  const todosStore = useStore($todos);

  useEffect(() => {
    $fetchTodos(id);
  }, []);

  const addTodo = (todo) => {
    TodoCRUD.create({
      task_card_id: id,
      name: todo.name,
      completed: false,
    }).then((response) => {
      $addTodo({ card_id: id, todo: response.data });
    });
  };

  const completedTodos = React.useMemo<ITodo[]>(() => {
    return (todosStore[id] || []).filter(({ completed }) => completed);
  }, [todosStore]);

  const uncompletedTodos = React.useMemo<ITodo[]>(() => {
    return (todosStore[id] || []).filter(({ completed }) => !completed);
  }, [todosStore]);

  return (
    <>
      <Typography style={{ padding: 10 }}>{name}</Typography>
      <Box
        style={{
          display: "flex",
          alignItems: "flex-start",
          padding: 4,
        }}
        className={classes.todo}
      >
        <NewTodo handleAdd={addTodo} />
      </Box>
      {uncompletedTodos.map((todo) => (
        <Box
          style={{
            display: "flex",
            alignItems: "flex-start",
            padding: 4,
          }}
          key={todo.id}
          className={classes.todo}
        >
          <ToggleTask card_id={id} {...todo} />
        </Box>
      ))}
      <CompletedTodos card_id={id} todos={completedTodos} />
    </>
  );
};



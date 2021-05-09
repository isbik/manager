import { createEffect, createEvent, createStore } from "effector";
import { TodoCRUD } from "../../services/API/todo";

export const $todos = createStore({});

export const $addTodo = createEvent<any>();
export const $deleteTodo = createEvent<any>();
export const $updateTodo = createEvent<any>();
export const $setTodos = createEvent<any>();

interface ITodo {
  id: number;
  name: string;
  completed: boolean;
}

type AddTodoType = {
  card_id: number;
  todo: any;
};

const addTodo = (state, { card_id, todo }: AddTodoType) => {
  const newState = { ...state };
  newState[card_id] = newState[card_id] ? [todo, ...newState[card_id]] : [todo];
  return newState;
};

const setTodos = (state, payload) => {
  const { card_id, todos } = payload.result;

  let newState = { ...state };
  newState[card_id] = newState[card_id]
    ? [...todos, ...newState[card_id]]
    : todos;
  console.log(newState);

  return newState;
};

interface DeleteTodoType {
  card_id: number;
  todo_id: number;
}
const deleteTodo = (state, { card_id, todo_id }: DeleteTodoType) => {
  const newState = { ...state };
  newState[card_id] = newState[card_id].filter(({ id }) => todo_id !== id);
  return newState;
};

const updateTodo = (state, { card_id, todo }) => {
  const newState = { ...state };
  const index = newState[card_id].findIndex(({ id }) => id === todo.id);

  newState[card_id][index] = todo;

  return newState;
};

export const $fetchTodos = createEffect();

$todos
  .on($addTodo, addTodo)
  .on($deleteTodo, deleteTodo)
  .on($fetchTodos.done, setTodos)
  .on($updateTodo, updateTodo)
  .watch((state) => {
    $fetchTodos.use(async (id: number) => {
      if (state[id]) return {};
      const response = await TodoCRUD.getAll({
        sort: "-created_at",
        task_card_id: id,
      });
      return { card_id: id, todos: response.data } || {};
    });
  });

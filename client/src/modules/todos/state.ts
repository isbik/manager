import { createEffect, createEvent, createStore } from "effector";
import { TasksCRUD } from "../../services/API/tasks";

export const $tasks = createStore({
  offset: null,
  limit: null,
  items: [],
});

export const $addTask = createEvent<any>();
export const $deleteTask = createEvent<any>();
export const $updateTasks = createEvent<any>();
export const $setTasks = createEvent<any>();

const addTask = (state, tasks) => {
  const newState = { ...state };
  newState.offset = newState.offset + 1;
  newState.items = [tasks, ...state.items];
  return newState;
};

const setTasks = (state, payload) => {
  let newState = { ...state };
  const { data, headers } = payload.result;

  const total = +headers["pagination-total-count"];
  const offset = +headers["pagination-offset"];
  const limit = +headers["pagination-limit"];

  newState = {
    offset: offset + limit,
    hasMore: total >= offset + limit,
    items: [...newState.items, ...data],
  };
  return newState;
};

const deleteTask = (state, tasks_id: number) => {
  const newState = { ...state };
  newState.offset -= 1;

  newState.items = newState.items.filter(({ id }) => tasks_id !== id);

  return newState;
};

const updateTasks = (state, tasks) => {
  const { id, data } = tasks;
  const newState = { ...state };
  const index = newState.items.findIndex(({ id: tasks_id }) => tasks_id === id);
  newState.items[index] = data;
  return newState;
};

export const $fetchTasks = createEffect();

$tasks
  .on($addTask, addTask)
  .on($deleteTask, deleteTask)
  .on($fetchTasks.done, setTasks)
  .on($updateTasks, updateTasks)
  .watch((state) => {
    $fetchTasks.use(async () => {
      const offset = state.offset || null;

      const response = await TasksCRUD.getAll({
        offset,
        sort: "-created_at",
        unboard: true,
      });

      response.data = response.data;

      return response || {};
    });
  });

import { createEffect, createEvent, createStore } from "effector";
import { HabitCRUD } from "../../services/API/habit";

export const $habits = createStore({
  offset: null,
  limit: null,
  items: [],
});

export const $addHabit = createEvent<any>();
export const $deleteHabit = createEvent<any>();
export const $updateHabit = createEvent<any>();
export const $setHabits = createEvent<any>();

const addHabit = (state, habit) => {
  const newState = { ...state };
  newState.offset = newState.offset + 1;
  newState.items = [habit, ...state.items];
  return newState;
};

const setHabits = (state, payload) => {
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

const deleteHabit = (state, habit_id: number) => {
  const newState = { ...state };
  newState.offset -= 1;

  newState.items = newState.items.filter(({ id }) => habit_id !== id);

  return newState;
};

const updateHabit = (state, habit) => {
  const { id, data } = habit;
  const newState = { ...state };
  const index = newState.items.findIndex(({ id: habit_id }) => habit_id === id);
  newState.items[index] = data;
  return newState;
};

export const $fetchHabit = createEffect();

$habits
  .on($addHabit, addHabit)
  .on($deleteHabit, deleteHabit)
  .on($fetchHabit.done, setHabits)
  .on($updateHabit, updateHabit)
  .watch((state) => {
    $fetchHabit.use(async () => {
      const offset = state.offset || null;

      const response = await HabitCRUD.getAll({
        offset,
        sort: "-created_at",
        unboard: true,
      });

      response.data = response.data;

      return response || {};
    });
  });

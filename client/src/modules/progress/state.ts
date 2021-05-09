import { createEffect, createEvent, createStore } from "effector";
import { ProgressCRUD } from "../../services/API/progress";

export const $progress = createStore({
  offset: null,
  limit: null,
  items: [],
});

export const $addProgress = createEvent<any>();
export const $deleteProgress = createEvent<any>();
export const $updateProgress = createEvent<any>();
export const $setProgress = createEvent<any>();

const addProgress = (state, progress) => {
  const newState = { ...state };
  newState.offset = newState.offset + 1;
  newState.items = [progress, ...state.items];
  return newState;
};

const setProgress = (state, payload) => {
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

const deleteProgress = (state, progress_id: number) => {
  const newState = { ...state };
  newState.offset -= 1;

  newState.items = newState.items.filter(({ id }) => progress_id !== id);

  return newState;
};

const updateProgress = (state, progress) => {
  const { id, data } = progress;
  const newState = { ...state };
  const index = newState.items.findIndex(
    ({ id: progress_id }) => progress_id === id
  );
  newState.items[index] = data;
  return newState;
};

export const $fetchProgress = createEffect();

$progress
  .on($addProgress, addProgress)
  .on($deleteProgress, deleteProgress)
  .on($fetchProgress.done, setProgress)
  .on($updateProgress, updateProgress)
  .watch((state) => {
    $fetchProgress.use(async () => {
      const offset = state.offset || null;

      const response = await ProgressCRUD.getAll({
        offset,
        sort: "-created_at",
        unboard: true,
      });

      response.data = response.data;

      return response || {};
    });
  });

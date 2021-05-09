import { createEffect, createEvent, createStore } from "effector";
import { NoteCRUD } from "../../services/API/note";
import { INoteTask } from "../../types/tasks";

interface INotesStore {
  offset?: number;
  limit?: number;
  notes: INoteTask[];
}

export const $notes = createStore<INotesStore>({
  offset: null,
  limit: null,
  notes: [],
});

export const $addNote = createEvent<any>();
export const $deleteNote = createEvent<any>();
export const $updateNote = createEvent<any>();
export const $setNotes = createEvent<any>();

const addNote = (state, note) => {
  const newState = { ...state };
  newState.offset = newState.offset + 1;
  newState.notes = [note, ...state.notes];
  return newState;
};

const setNotes = (state, payload) => {
  let newState = { ...state };
  const { data, headers } = payload.result;

  const total = +headers["pagination-total-count"];
  const offset = +headers["pagination-offset"];
  const limit = +headers["pagination-limit"];

  newState = {
    offset: offset + limit,
    hasMore: total >= offset + limit,
    notes: [...newState.notes, ...data],
  };
  return newState;
};

const deleteNote = (state, note_id: number) => {
  const newState = { ...state };
  newState.offset -= 1;

  newState.notes = newState.notes.filter(({ id }) => note_id !== id);

  return newState;
};

const updateNote = (state, note) => {
  const { id, data } = note;
  const newState = { ...state };
  const index = newState.notes.findIndex(({ id: note_id }) => note_id === id);
  newState.notes[index] = data;
  return newState;
};

export const $fetchNotes = createEffect();

$notes
  .on($addNote, addNote)
  .on($setNotes, setNotes)
  .on($deleteNote, deleteNote)
  .on($fetchNotes.done, setNotes)
  .on($updateNote, updateNote)
  .watch((state) => {
    $fetchNotes.use(async () => {
      const offset = state.offset || null;

      const response = await NoteCRUD.getAll({
        offset,
        sort: "-created_at",
        unboard: true,
      });

      response.data = response.data;

      return response || {};
    });
  });

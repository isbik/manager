import { createEffect, createEvent, createStore } from "effector";
import { getAllBoards, getBoardCards } from "../../services/API/board";
import { IBoard } from "./components/BoardList";

export const $boards = createStore<IBoard[]>([]);
export const $boardsLoading = createStore(true);

export const $addBoard = createEvent<IBoard>();
export const $deleteBoard = createEvent<number>();
export const $increaseBoardCardCount = createEvent<number>();
export const $decreaseBoardCardCount = createEvent<number>();
export const $updateBoard = createEvent<any>();

export const $fetchBoards = createEffect({
  async handler() {
    const response = await getAllBoards();
    return response.data || [];
  },
});

const addBoard = (state: IBoard[], board: IBoard) => {
  return [board, ...state];
};

const increaseBoardCardCount = (state: IBoard[], board_id) => {
  const newState = [...state];
  const index = newState.findIndex(({ id }) => id === board_id);
  newState[index].cards_count += 1;
  return newState;
};

const decreaseBoardCardCount = (state: IBoard[], board_id) => {
  const newState = [...state];
  const index = newState.findIndex(({ id }) => id === board_id);
  newState[index].cards_count -= 1;
  return newState;
};

const deleteBoard = (state: IBoard[], boardId: number) => {
  return state.filter(({ id }) => id !== boardId);
};

const updateBoard = (state: IBoard[], payload) => {
  const { board_id, data } = payload;

  const newState = [...state];
  const index = newState.findIndex(({ id }) => board_id === id);
  newState[index] = Object.assign(newState[index], data);

  return newState;
};

const setBoards = (state: IBoard[], boards: any) => {
  return [...state, ...boards.result];
};

export const $setBoardName = createEvent<string>();

export const $boardName = createStore<string>("").on(
  $setBoardName,
  (_, name) => name
);

$boardsLoading.on($fetchBoards.done, () => false);

$boards
  .on($addBoard, addBoard)
  .on($increaseBoardCardCount, increaseBoardCardCount)
  .on($decreaseBoardCardCount, decreaseBoardCardCount)
  .on($deleteBoard, deleteBoard)
  .on($updateBoard, updateBoard)
  .on($fetchBoards.done, setBoards);

export const $fetchBoardCards = createEffect<any>();
export const $addCard = createEvent<any>();
export const $deleteCard = createEvent<any>();

// ***BOARD CARDS **//
export const $boardCards = createStore<any>({});
export const $boardCardsLoading = createStore(true);

const setBoardCards = (state: any, payload: any) => {
  const newState = { ...state };
  const { data, headers } = payload.result;
  const { board_id, cards } = data;

  const total = +headers["pagination-total-count"];
  const offset = +headers["pagination-offset"];
  const limit = +headers["pagination-limit"];

  newState[board_id] = {
    offset: offset + limit,
    hasMore: total >= offset + limit,
    cards: newState[board_id]?.cards
      ? [...newState[board_id].cards, ...cards]
      : cards,
  };
  return newState;
};

const addCard = (state, payload) => {
  const newState = { ...state };
  const { board_id, data } = payload;

  newState[board_id].offset = newState[board_id].offset + 1;
  newState[board_id].cards = [data, ...newState[board_id].cards];
  return newState;
};

const deleteCard = (state, payload) => {
  const newState = { ...state };
  const { board_id, id } = payload;

  newState[board_id].offset = newState[board_id].offset - 1;

  newState[board_id].cards = newState[board_id].cards.filter(
    (card) => card.id !== id
  );
  return newState;
};

$boardCardsLoading.on($fetchBoardCards.done, () => {
  return false;
});

$boardCardsLoading.on($fetchBoardCards.pending, () => {
  return $fetchBoardCards.pending.getState();
});

$boardCards
  .on($fetchBoardCards.done, setBoardCards)
  .on($addCard, addCard)
  .on($deleteCard, deleteCard)
  .watch((state) => {
    $fetchBoardCards.use(async (id: number) => {
      const offset = state[id]?.offset || null;

      const response = await getBoardCards({
        board_id: id,
        offset,
        sort: "-created_at",
      });
      response.data = { cards: response.data, board_id: id };

      return response || {};
    });
  });

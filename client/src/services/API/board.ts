import mainApi from "../APIService";
import { CRUDFactory } from "../CRUDFactory";

export const getAllBoards = (params = {}) => {
  return mainApi.get("boards/", { params });
};

export const createBoard = (params = {}) => {
  return mainApi.post("boards/", params);
};

export const getBoardCards = (params = {}) => {
  return mainApi.get(`card/`, { params });
};

export const BoardCRUD = CRUDFactory("boards");

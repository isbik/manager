import { createEvent, createStore } from "effector";

export const $user = createStore({});

export const $setUser = createEvent<any>();

const setUser = (state, user) => {
  return user;
};

$user.on($setUser, setUser);

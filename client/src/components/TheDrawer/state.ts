import { createEvent, createStore } from "effector";

export const $drawer = createStore<boolean>(false);

export const $toggleDrawer = createEvent();

const toggleDrawer = (state: boolean) => {
  return !state;
};

$drawer.on($toggleDrawer, toggleDrawer);

export const $theme = createStore<boolean>(false);

export const $toggleTheme = createEvent();

const toggleTheme = (state: boolean) => {
  return !state;
};

$theme.on($toggleTheme, toggleTheme);

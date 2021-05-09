import { createEvent, createStore } from "effector";

export const $backroundColor = createStore<string | null>("");

export const $setBackgroundColor = createEvent<string>();

$backroundColor.on($setBackgroundColor, (_, color) => {
  return color;
});

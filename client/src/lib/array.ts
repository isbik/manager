import React from "react";

export const generate = (count: number, Item: React.ReactNode) =>
  Array.from({ length: count }).map((_, index) => Item);

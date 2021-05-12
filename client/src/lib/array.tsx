import React from "react";

export const generate = (count: number, item: React.ReactNode) =>
  Array.from({ length: count }).map((_, index) => (
    <React.Fragment key={index}>{item}</React.Fragment>
  ));

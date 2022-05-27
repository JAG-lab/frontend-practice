import React from "react";
import { Bar1, Bar2, Bar3, Bar4, Bar5, Bar6 } from "./InputBars";

export default function Inputs({ dispatch }) {
  return (
    <>
      <Bar1 dispatch={dispatch} />
      <Bar2 dispatch={dispatch} />
      <Bar3 dispatch={dispatch} />
      <Bar4 dispatch={dispatch} />
      <Bar5 dispatch={dispatch} />
      <Bar6 dispatch={dispatch} />
    </>
  );
}

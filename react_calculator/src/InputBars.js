import React from "react";
import {
  NumberButton,
  OperationButton,
  EqualsButton,
  AllClearButton,
  PartClearButton,
  DeleteButton,
  NegateButton,
} from "./Buttons.js";

export function Bar1({ dispatch }) {
  return (
    <>
      <AllClearButton dispatch={dispatch} />
      <PartClearButton dispatch={dispatch} />
      <DeleteButton dispatch={dispatch} />
      <NegateButton dispatch={dispatch} />
    </>
  );
}

export function Bar2({ dispatch }) {
  return (
    <>
      <OperationButton dispatch={dispatch} operation="Xʸ" />
      <OperationButton dispatch={dispatch} operation="√" />
      <OperationButton dispatch={dispatch} operation="LOG" />
      <OperationButton dispatch={dispatch} operation="÷" />
    </>
  );
}

export function Bar3({ dispatch }) {
  return (
    <>
      <NumberButton dispatch={dispatch} digit="1" />
      <NumberButton dispatch={dispatch} digit="2" />
      <NumberButton dispatch={dispatch} digit="3" />
      <OperationButton dispatch={dispatch} operation="*" />
    </>
  );
}

export function Bar4({ dispatch }) {
  return (
    <>
      <NumberButton dispatch={dispatch} digit="4" />
      <NumberButton dispatch={dispatch} digit="5" />
      <NumberButton dispatch={dispatch} digit="6" />
      <OperationButton dispatch={dispatch} operation="+" />
    </>
  );
}

export function Bar5({ dispatch }) {
  return (
    <>
      <NumberButton dispatch={dispatch} digit="7" />
      <NumberButton dispatch={dispatch} digit="8" />
      <NumberButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} operation="-" />
    </>
  );
}

export function Bar6({ dispatch }) {
  return (
    <>
      <NumberButton dispatch={dispatch} digit="0" />
      <NumberButton dispatch={dispatch} digit="." />
      <EqualsButton dispatch={dispatch} />
    </>
  );
}

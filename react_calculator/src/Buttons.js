import React from "react";
import { ACTIONS } from "./App.js";
import "./Buttons.css";

export function NumberButton({ dispatch, digit }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: {digit: digit} })}
    >
      {digit}
    </button>
  );
}

export function OperationButton({ dispatch, operation }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: {operation: operation} })
      }
    >
      {operation}
    </button>
  );
}

export function AllClearButton({ dispatch }) {
  return <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>;
}

export function PartClearButton({ dispatch }) {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.PARTIAL_CLEAR })}>C</button>
  );
}

export function DeleteButton({ dispatch }) {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
      DEL
    </button>
  );
}

export function NegateButton({ dispatch }) {
  return (
    <button onClick={() => dispatch({ type: ACTIONS.NEGATE })}>NEG</button>
  );
}

export function EqualsButton({ dispatch }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.EQUALS })}
      className="span-two"
    >
      =
    </button>
  );
}

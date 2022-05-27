import Output from "./Output.js";
import Inputs from "./Inputs.js";
import "./App.css";
import { useReducer } from "react";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  PARTIAL_CLEAR: "partial-clear",
  DELETE_DIGIT: "delete-digit",
  CHOOSE_OPERATION: "choose-operation",
  NEGATE: "negate",
  EQUALS: "equals",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (
        state.currOperand === "Cannot compute" ||
        state.currOperand === "∞" ||
        state.prevOperand === "Cannot compute" ||
        state.prevOperand === "∞"
      )
        return {
          ...state,
          currOperand: "",
          prevOperand: "",
          operation: undefined,
        };
      if (payload.digit === "0" && state.currOperand === "0") return state;
      if (payload.digit === "." && state.currOperand.toString().includes("."))
        return state;
      return {
        ...state,
        currOperand: `${state.currOperand}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        currOperand: "",
        prevOperand: "",
        operation: undefined,
      };
    case ACTIONS.PARTIAL_CLEAR:
      return {
        ...state,
        currOperand: "",
      };
    case ACTIONS.DELETE_DIGIT:
      if (
        state.currOperand === "Cannot compute" ||
        state.prevOperand === "Cannot compute"
      )
        return {
          ...state,
          currOperand: "",
          prevOperand: "",
          operation: undefined,
        };
      if (state.currOperand === "") return state;

      return {
        ...state,
        currOperand: state.currOperand.toString().slice(0, -1),
      };
    case ACTIONS.NEGATE:
      if (
        state.currOperand === "Cannot compute" ||
        state.prevOperand === "Cannot compute"
      )
        return {
          ...state,
          currOperand: "",
          prevOperand: "",
          operation: undefined,
        };
      if (state.currOperand === "∞")
        return {
          ...state,
          currOperand: "-∞",
        };
      if (state.currOperand === "-∞")
        return {
          ...state,
          currOperand: "∞",
        };
      if (state.currOperand === "" || state.currOperand === ".") return state;
      return {
        ...state,
        currOperand: (-1 * parseFloat(state.currOperand)).toString(),
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (
        state.currOperand === "Cannot compute" ||
        state.currOperand === "∞" ||
        state.prevOperand === "Cannot compute" ||
        state.prevOperand === "∞"
      )
        return {
          ...state,
          currOperand: "",
          prevOperand: "",
          operation: undefined,
        };
      if (state.currOperand === "") return state;
      if (state.prevOperand !== "")
        return {
          ...state,
          prevOperand: compute(
            state.operation,
            state.prevOperand,
            state.currOperand
          ),
          currOperand: "",
          operation: payload.operation,
        };
      return {
        ...state,
        prevOperand: state.currOperand,
        currOperand: "",
        operation: payload.operation,
      };
    case ACTIONS.EQUALS:
      if (state.currOperand === "" || state.prevOperand === "") return state;
      else
        return {
          ...state,
          currOperand: compute(
            state.operation,
            state.prevOperand,
            state.currOperand
          ),
          prevOperand: "",
          operation: undefined,
        };
    default:
      return;
  }
}

function compute(op, p, c) {
  let result;
  const prev = parseFloat(p);
  const curr = parseFloat(c);
  if (isNaN(prev) || isNaN(curr)) return "Cannot compute"
  switch (op) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "÷":
      result = prev / curr;
      break;
    case "Xʸ":
      result = Math.pow(prev, curr);
      break;
    case "√":
      console.log("yes it did pass through here");
      if (prev < 0 && !(curr % 2)) {
        result = "Cannot compute";
        break;
      }
      let n = prev < 0 ? prev * -1 : prev;
      result =
        !(curr % 2) && prev < 0
          ? -Math.pow(n, 1 / curr)
          : Math.pow(n, 1 / curr);
      break;
    case "LOG":
      if (prev < 0 || curr < 0) {
        result = "Cannot compute";
        break;
      }
      result = Math.log(curr) / Math.log(prev);
      break;
    default:
      return;
  }
  if (result.toString() === "Infinity") return "∞";
  if (result.toString() === "-Infinity") return "-∞";
  return result.toString();
}

function App() {
  const [{ currOperand, prevOperand, operation }, dispatch] = useReducer(
    reducer,
    {
      currOperand: "",
      prevOperand: "",
      operation: undefined,
    }
  );
  return (
    <div className="calculator-grid">
      <Output curr={currOperand} prev={prevOperand} oper={operation} />
      <Inputs dispatch={dispatch} />
    </div>
  );
}

export default App;

import React from "react";
import "./Output.css";

export default function Output({ curr, prev, oper }) {
  if (prev === "Cannot compute")
    return (
      <div className="result-render">
        <div className="prev-operand-render"></div>
        <div className="curr-operand-render">{prev}</div>
      </div>
    );
  else
    return (
      <div className="result-render">
        <div className="prev-operand-render">
          {getDisplayNumber(prev)} {oper}
        </div>
        <div className="curr-operand-render">{getDisplayNumber(curr)}</div>
      </div>
    );
}

function getDisplayNumber(num) {
  if (num === "Cannot compute" || num === "∞" || num === "-∞") return num;
  const stringNumber = num.toString();
  const integerDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split(".")[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = "";
  } else {
    integerDisplay = integerDigits.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else return integerDisplay;
}

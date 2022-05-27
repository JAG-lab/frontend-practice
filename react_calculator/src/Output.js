import React from "react";
import "./Output.css";

export default function Output({ curr, prev, oper }) {
  if (prev === "Cannot compute")
    return (
      <div className="result-render">
      <div className="prev-operand-render"></div>
      <div className="curr-operand-render">{prev}</div>
    </div>
    )
  else return (
    <div className="result-render">
      <div className="prev-operand-render">
        {prev} {oper}
      </div>
      <div className="curr-operand-render">{curr}</div>
    </div>
  );
}

import React from "react";
import Component from "./Component";

const format = position => {
  let result = position.toFixed(3);
  while (result.length < 7) {
    result = " " + result;
  }
  return result;
};

const Point = props => {
  return (
    <p className="m-0 text-monospace text-right">
      {"X: " +
        format(props.x) +
        ", Y: " +
        format(props.y) +
        ", Z: " +
        format(props.z)}
    </p>
  );
};

export default Point;

import React from "react";

const format = position => {
  let result = position.toFixed(3);
  while (result.length < 7) {
    result = " " + result;
  }
  return result;
};

const PointDisplay = props => {
  let text = [];
  text.push("x:" + format(props.x));
  text.push("y:" + format(props.y));
  if (props.hasOwnProperty("z")) {
    text.push("z:" + format(props.z));
  }
  if (props.hasOwnProperty("a")) {
    text.push("a:" + format(props.a));
  }
  if (props.hasOwnProperty("b")) {
    text.push("b:" + format(props.b));
  }

  if (props.inline) {
    let displayText = "";
    text.map((element, index) => {
      if (index > 0) {
        displayText += ", ";
      }
      displayText += element;
    });
    return <p className="m-0 text-monospace">{displayText}</p>;
  } else {
    return (
      <React.Fragment>
        {text.map((element, index) => {
          return (
            <p key={index} className="m-0 text-monospace">
              {element}
            </p>
          );
        })}
      </React.Fragment>
    );
  }
};

export default PointDisplay;

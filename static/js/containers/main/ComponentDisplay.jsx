import React from "react";

const ComponentDisplay = props => {
  let text = [];
  text.push("value:" + props.value);
  text.push("package:" + props.package);

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

export default ComponentDisplay;

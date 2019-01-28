import React from "react";

const ComponentDisplay = props => {
  if (props.inline) {
    let text = "";
    Object.keys(props).forEach((key, index) => {
      text += (index > 0 ? ", " : "") + key + ":" + props[key];
    });
    return <p className="m-0 text-monospace">{text}</p>;
  } else {
    return (
      <React.Fragment>
        {Object.keys(props).map((key, index) => {
          return (
            <p key={index} className="m-0 text-monospace">
              {key + ": " + props[key]}
            </p>
          );
        })}
      </React.Fragment>
    );
  }
};

export default ComponentDisplay;

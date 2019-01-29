import React from "react";

const ObjectProps = props => {
  if (props.inline) {
    let text = "";
    Object.keys(props.object)
      .sort()
      .forEach((key, index) => {
        if (!props.onlyKeys || props.onlyKeys.indexOf(key) !== -1) {
          text += (index > 0 ? ", " : "") + key + ":" + props.object[key];
        }
      });
    return <p className="m-0 text-monospace">{text}</p>;
  } else {
    return (
      <React.Fragment>
        {Object.keys(props.object)
          .sort()
          .map((key, index) => {
            return (
              <p key={index} className="m-0 text-monospace">
                {key + ": " + props.object[key]}
              </p>
            );
          })}
      </React.Fragment>
    );
  }
};

export default ObjectProps;

import React from "react";

const InputGroup = props => {
  let className = "input-group";
  if (props.small) {
    className += " input-group-sm";
  } else if (props.large) {
    className += " input-group-lg";
  }
  if (props.className) {
    className += " " + props.className;
  }
  return <div className={className}>{props.children}</div>;
};

const InputGroupPrepend = props => {
  let className = "input-group-prepend";
  if (props.className) {
    className += " " + props.className;
  }
  return <div className={className}>{props.children}</div>;
};

const InputGroupAppend = props => {
  let className = "input-group-append";
  if (props.className) {
    className += " " + props.className;
  }
  return <div className={className}>{props.children}</div>;
};

const InputGroupText = props => {
  let className = "input-group-text";
  if (props.className) {
    className += " " + props.className;
  }
  return <span className={className}>{props.children}</span>;
};

export { InputGroup, InputGroupPrepend, InputGroupAppend, InputGroupText };

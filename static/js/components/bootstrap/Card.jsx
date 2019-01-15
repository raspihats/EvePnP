import React from "react";

const Card = props => {
  let className = "card";
  if (props.className) {
    className += " " + props.className;
  }
  return <div className={className}>{props.children}</div>;
};

const CardHeader = props => {
  let className = "card-header";
  if (props.className) {
    className += " " + props.className;
  }
  return <div className={className}>{props.children}</div>;
};

const CardBody = props => {
  let className = "card-body";
  if (props.className) {
    className += " " + props.className;
  }
  return <div className={className}> {props.children}</div>;
};

const CardFooter = props => {
  let className = "card-footer";
  if (props.className) {
    className += " " + props.className;
  }
  return <div className={className}>{props.children}</div>;
};

export { Card, CardHeader, CardBody, CardFooter };

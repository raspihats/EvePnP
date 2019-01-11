import React from "react";

const Panel = props => {
  return <div className="card">{props.children}</div>;
};

const PanelHeader = props => {
  return <div className="card-header">{props.children}</div>;
};

const PanelBody = props => {
  return <div className="card-body"> {props.children}</div>;
};

const PanelFooter = props => {
  return <div className="card-footer"> {props.children}</div>;
};

export { Panel, PanelHeader, PanelBody, PanelFooter };

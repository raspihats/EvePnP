import React from "react";

const PillsNavExtractor = props => {
  const items = props.pillsNav.props.children.map(tab => {
    return (
      <li className="nav-item" key={tab.props.title}>
        <a
          className={
            "nav-link " +
            props.pillsNav.props.className +
            (tab.props.active ? " active" : "")
          }
          id={tab.props.title + "-tab"}
          data-toggle="pill"
          href={"#" + tab.props.title}
          role="tab"
          aria-controls={tab.props.title}
          aria-selected={tab.props.active ? "true" : "false"}
        >
          {tab.props.title}
        </a>
      </li>
    );
  });

  return (
    <ul
      className={
        "nav nav-pills" + (props.className ? " " + props.className : "")
      }
      // id={props.id ? props.id : ""}
      role="tablist"
    >
      {items}
    </ul>
  );
};

const PillsNavPane = props => {
  return (
    <div
      className={"tab-pane fade" + (props.active ? " show active" : "")}
      id={props.title}
      role="tabpanel"
      aria-labelledby={props.title + "-tab"}
    >
      {props.children}
    </div>
  );
};

const PillsNav = props => {
  const nav = <PillsNavExtractor pillsNav={{ props: props }} />;

  return (
    <React.Fragment>
      {props.onlyPanes ? "" : nav}
      <div className="tab-content">{props.children}</div>
    </React.Fragment>
  );
};

export { PillsNav, PillsNavPane, PillsNavExtractor };

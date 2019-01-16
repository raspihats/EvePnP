import React from "react";

const Nav = props => {
  const items = props.pillsNav.props.children.map(tab => {
    return (
      <li className="nav-item" key={tab.props.title}>
        <a
          className={
            "nav-link" +
            (props.pillsNav.props.small ? " py-0" : "") +
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
        "nav nav-pills" +
        (props.pillsNav.props.center ? " justify-content-center" : "")
      }
      role="tablist"
    >
      {items}
    </ul>
  );
};

const Panes = props => {
  return <div className="tab-content">{props.pillsNav.props.children}</div>;
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
  return (
    <React.Fragment>
      <PillsNavMenu pillsNav={{ props: props }} />
      <PillsNavPanes pillsNav={{ props: props }} />
    </React.Fragment>
  );
};

const PillsNavPart = { Nav, Panes };

export { PillsNav, PillsNavPane, PillsNavPart };

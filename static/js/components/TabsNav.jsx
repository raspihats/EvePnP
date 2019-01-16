import React from "react";

const TabsNav = props => {
  const titles = props.children.map(child => {
    let className = "nav-link";
    if (child.props.active) {
      className += " active";
    }
    if (props.small) {
      className += " py-0";
    }
    return (
      <li className="nav-item" key={child.props.title}>
        <a
          className={className}
          id={child.props.title + "-tab"}
          href={"#" + child.props.title}
          data-toggle="tab"
          role="tab"
          aria-controls={child.props.title}
          aria-selected={child.props.active ? "true" : "false"}
        >
          {child.props.title}
        </a>
      </li>
    );
  });

  return (
    <React.Fragment>
      <ul className="nav nav-tabs" role="tablist">
        {titles}
      </ul>
      <div className="tab-content">{props.children}</div>
    </React.Fragment>
  );
};

const TabPane = props => {
  let className = "tab-pane fade";
  if (props.active) {
    className += " show active";
  }
  if (props.className) {
    className += " " + props.className;
  }
  return (
    <div
      className={className}
      id={props.title}
      role="tabpanel"
      aria-labelledby={props.title + "-tab"}
    >
      {props.children}
    </div>
  );
};

export { TabsNav, TabPane };

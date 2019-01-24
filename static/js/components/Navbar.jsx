import React from "react";

const Navbar = props => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light border-bottom py-0 mb-3">
      <div className="container-fluid">
        {/* <a className="navbar-brand text-info" href="#"> */}
        <span
          className="navbar-brand text-info pr-3"
          style={{ fontWeight: 700 }}
        >
          EvePnP
          <small className="text-muted">
            a web based pick and place machine controller
          </small>
        </span>
        {/* </a> */}
        {props.children}
      </div>
    </nav>
  );
};

export default Navbar;

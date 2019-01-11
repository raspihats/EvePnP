import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand text-info" href="#">
          <span className="navbar-brand text-info" style={{ fontWeight: 700 }}>
            EvePnP
          </span>
          <small className="text-muted">
            a web based pick and place machine controller
          </small>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

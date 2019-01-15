import React, { Component } from "react";
import Navbar from "./components/Navbar";
import ControlsPanel from "./components/panels/controls";
import CamerasPanel from "./components/panels/cameras";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main role="main" className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6 pb-3">
              <ControlsPanel />
            </div>
            <div className="col-12 col-md-6 pb-3">
              <CamerasPanel />
            </div>
            <div className="col-12">
              <CamerasPanel />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

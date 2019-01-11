import React, { Component } from "react";
import Navbar from "./containers/Navbar";
import ControlsPanel from "./containers/ControlsPanel";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main role="main" className="container-fluid">
          <div className="row">
            <div className="col-4">
              <ControlsPanel />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

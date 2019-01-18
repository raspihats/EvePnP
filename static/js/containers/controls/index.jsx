import React from "react";
import { Card, CardHeader, CardBody } from "../../components/Card";
import {
  PillsNav,
  PillsNavPane,
  PillsNavPart
} from "../../components/PillsNav";
import Select from "../../components/Select";
import JogDial from "./JogDial";
import api from "../../api";

class ControlsPanel extends React.Component {
  state = {};

  onHome() {
    api
      .put(
        "axis/home",
        [..."xyz"].map(c => {
          return { axis: c };
        })
      )
      .catch(error => {
        api.errorHandler("Homing error!", error);
      });
  }

  onPark(axis) {
    api
      .put(
        "axis/park",
        [...axis].map(c => {
          return { axis: c };
        })
      )
      .catch(error => {
        api.errorHandler("Parking error!", error);
      });
  }

  onJog(axis, step) {
    api.put("axis/park", { axis: axis, step: step }).catch(error => {
      api.errorHandler("Parking error!", error);
    });
  }

  render() {
    const pillsNav = (
      <PillsNav small>
        <PillsNavPane title="Jog" active>
          <Select small prepend="Nozzle:" options={["N1", "N2"]} />
          <JogDial
            onHome={this.onHome}
            onPark={this.onPark}
            onJog={this.onJog}
            rotationAxis="A"
          />
        </PillsNavPane>
        <PillsNavPane title="Actuators">Actuators</PillsNavPane>
      </PillsNav>
    );
    return (
      <Card>
        <CardHeader>
          <div className="row">
            <div className="col-auto">
              <span className="font-weight-bold text-info">Controls</span>
            </div>
            <div className="col-auto">
              <PillsNavPart.Nav pillsNav={pillsNav} />
            </div>
          </div>
        </CardHeader>
        <CardBody className="text-center">
          <PillsNavPart.Panes pillsNav={pillsNav} />
        </CardBody>
      </Card>
    );
  }
}

export default ControlsPanel;

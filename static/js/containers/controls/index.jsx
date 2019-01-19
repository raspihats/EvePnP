import React from "react";
import { Card, CardHeader, CardBody } from "../../components/Card";
import {
  PillsNav,
  PillsNavPane,
  PillsNavPart
} from "../../components/PillsNav";
import Jog from "./jog";
import Actuators from "./actuators";

class ControlsPanel extends React.Component {
  state = {};

  render() {
    const pillsNav = (
      <PillsNav small>
        <PillsNavPane title="Jog" active>
          <Jog />
        </PillsNavPane>
        <PillsNavPane title="Actuators">
          <Actuators />
        </PillsNavPane>
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

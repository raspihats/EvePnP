import React from "react";
import { Card, CardHeader, CardBody } from "../../components/Card";
import {
  PillsNav,
  PillsNavPane,
  PillsNavPart
} from "../../components/PillsNav";
import Select from "../../components/Select";
import JogDial from "./JogDial";

const ControlsPanel = props => {
  const pillsNav = (
    <PillsNav small>
      <PillsNavPane title="Jog" active>
        <Select small prepend="Nozzle:" options={["N1", "N2"]} />
        <JogDial />
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
      {/* <CardFooter>
        <div className="row">
          <div className="col-auto">
            <span>Speed[%]:</span>
          </div>
          <div className="col-auto">
            <input
              type="range"
              class="form-control-range"
              id="formControlRange"
            />
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
};

export default ControlsPanel;

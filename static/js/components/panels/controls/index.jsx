import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "../../bootstrap/Card";
// import { Tabs, TabPane } from "../../bootstrap/Tabs";
import {
  PillsNav,
  PillsNavPane,
  PillsNavExtractor
} from "../../bootstrap/PillsNav";
import Select from "../../bootstrap/Select";
import JogDial from "./JogDial";

const ControlsPanel = props => {
  const pillsNav = (
    <PillsNav className="py-0" onlyPanes>
      <PillsNavPane title="Jog" active>
        <Select prepend="Nozzle:" size="small" options={["N1", "N2"]} />
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
            <PillsNavExtractor pillsNav={pillsNav} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="text-center">{pillsNav}</CardBody>
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
};

export default ControlsPanel;

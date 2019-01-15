import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "../../bootstrap/Card";
import { Tabs, TabPane } from "../../bootstrap/Tabs";
import Select from "../../bootstrap/Select";
import JogDial from "./JogDial";

const ControlsPanel = props => {
  return (
    <Card>
      <CardHeader>Controls</CardHeader>
      <CardBody className="text-center">
        <Tabs small>
          <TabPane className="border border-top-0 p-2" title="Jog" active>
            <Select prepend="Nozzle:" size="small" options={["N1", "N2"]} />
            <JogDial />
          </TabPane>
          <TabPane className="border border-top-0 p-2" title="Actuators">
            Actuators
          </TabPane>
        </Tabs>
      </CardBody>
      <CardFooter>
        <input
          type="range"
          min="1"
          max="100"
          value="50"
          className="slider"
          id="myRange"
          onChange={e => {
            console.log(e);
          }}
        />
      </CardFooter>
    </Card>
  );
};

export default ControlsPanel;

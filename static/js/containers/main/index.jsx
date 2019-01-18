import React from "react";
import { Card, CardHeader, CardBody } from "../../components/Card";
import {
  PillsNav,
  PillsNavPane,
  PillsNavPart
} from "../../components/PillsNav";
import Job from "./Job";

const MainPanel = () => {
  const pillsNav = (
    <PillsNav center>
      <PillsNavPane title="Jobs" active>
        <Job />
      </PillsNavPane>
      <PillsNavPane title="Feeders">Feeders</PillsNavPane>
    </PillsNav>
  );
  return (
    <Card>
      <CardHeader>
        <PillsNavPart.Nav pillsNav={pillsNav} />
      </CardHeader>
      <CardBody className="text-center">
        <PillsNavPart.Panes pillsNav={pillsNav} />
      </CardBody>
    </Card>
  );
};

export default MainPanel;

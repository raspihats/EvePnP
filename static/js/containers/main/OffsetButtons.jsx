import React from "react";
import IconButton from "./IconButton";

const OffsetButtons = props => {
  let devices = [];
  props.heads.forEach(head => {
    head.cameras.forEach(camera => {
      camera.type = "camera";
      devices.push(camera);
    });
    head.nozzle_carriages.forEach(nozzle_carriage => {
      nozzle_carriage.type = "nozzle carriage";
      devices.push(nozzle_carriage);
    });
  });

  return (
    <React.Fragment>
      {devices.map(device => {
        return (
          <IconButton
            key={device.id}
            title={props.title + "[" + device.type + ": " + device.id + "]"}
            icon={device.type === "camera" ? "bullseye" : "dot-circle"}
            onClick={e => props.onClick(device.offset)}
          />
        );
      })}
    </React.Fragment>
  );
};

export default OffsetButtons;

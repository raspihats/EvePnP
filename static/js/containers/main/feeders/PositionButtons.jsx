import React from "react";
import IconButton from "./IconButton";
import api from "../../../api";

class CaptureButtons extends React.Component {
  state = { devices: [] };

  componentDidMount() {
    api.heads.list(heads => {
      let devices = [];
      heads.forEach(head => {
        head.cameras.forEach(camera => {
          camera.type = "camera";
          devices.push(camera);
        });
        head.nozzle_carriages.forEach(nozzle_carriage => {
          nozzle_carriage.type = "nozzle carriage";
          devices.push(nozzle_carriage);
        });
      });
      this.setState({ devices: devices });
    });
  }

  calcPosition(offset) {
    api.axis.positions.list(data => {
      let positions = {};
      Object.keys(offset).forEach(key => {
        data.forEach(axis => {
          if (axis.id === key) {
            positions[key] = axis.position + offset[key];
          }
        });
      });
      this.props.onClick(positions);
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.devices.map(device => {
          return (
            <IconButton
              key={device.id}
              title={
                this.props.title + "[" + device.type + ": " + device.id + "]"
              }
              icon={device.type === "camera" ? "bullseye" : "dot-circle"}
              onClick={e => this.calcPosition(device.offset)}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default CaptureButtons;

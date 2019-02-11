import React from "react";
import IconButton from "./IconButton";
import api from "../../api";

class CaptureHeadButtons extends React.Component {
  state = {};

  formatApiPointData(data) {
    let point = {};
    data.forEach(axis => {
      point[axis.id] = axis.position;
    });
    return point;
  }

  getCameraPosition(cameraId) {
    api.head.get("cameras/" + cameraId + "/position", data => {
      this.props.onCapture(this.formatApiPointData(data));
    });
  }

  getPlacementHeadPosition(pHeadId) {
    console.log(pHeadId);
    api.head.get("p_heads/" + pHeadId + "/position", data => {
      this.props.onCapture(this.formatApiPointData(data));
    });
  }

  render() {
    let { head } = this.props;
    return (
      <React.Fragment>
        {head &&
          head.cameras.map(camera => {
            return (
              <IconButton
                key={camera.id}
                title={"Capture '" + camera.id + "' position"}
                icon="bullseye"
                onClick={e => this.getCameraPosition(camera.id)}
              />
            );
          })}
        {head &&
          head.placement_heads.map(pHead => {
            return (
              <IconButton
                key={pHead.id}
                title={"Capture '" + pHead.id + "' position"}
                icon="dot-circle"
                onClick={e => this.getPlacementHeadPosition(pHead.id)}
              />
            );
          })}
      </React.Fragment>
    );
  }
}

export default CaptureHeadButtons;

import React from "react";
import IconButton from "./IconButton";
import api from "../../api";

const moveCamera = (cameraId, point) => {
  let positions = Object.keys(point).map(axis => {
    return { id: axis, position: point[axis] };
  });
  api.head.update(
    "cameras/" + cameraId + "/position",
    positions,
    () => {},
    10000
  );
};

const movePlacementHead = (pHeadId, point) => {
  let positions = Object.keys(point).map(axis => {
    return { id: axis, position: point[axis] };
  });
  api.head.update(
    "p_heads/" + pHeadId + "/position",
    positions,
    () => {},
    10000
  );
};

const MoveHeadButtons = props => {
  return (
    <React.Fragment>
      {props.head &&
        props.head.cameras.map(camera => {
          return (
            <IconButton
              key={camera.id}
              title={"Move to '" + camera.id + "' position"}
              icon="bullseye"
              onClick={e => moveCamera(camera.id, props.point)}
            />
          );
        })}
      {props.head &&
        props.head.placement_heads.map(pHead => {
          return (
            <IconButton
              key={pHead.id}
              title={"Move to '" + pHead.id + "' position"}
              icon="dot-circle"
              onClick={e => movePlacementHead(pHead.id, props.point)}
            />
          );
        })}
    </React.Fragment>
  );
};

export default MoveHeadButtons;

import React from "react";
import IconButton from "./IconButton";

const MoveHeadsButtons = props => {
  return (
    <React.Fragment>
      {props.heads.map(head => {
        return (
          <React.Fragment key={head.id}>
            {head.cameras.map(camera => {
              return (
                <IconButton
                  key={camera.id}
                  title={props.title + "[" + head.id + ": " + camera.id + "]"}
                  icon="bullseye"
                  onClick={e => props.onClick(head.id, camera.id)}
                />
              );
            })}
            {head.nozzle_carriages.map(n_car => {
              return (
                <IconButton
                  key={n_car.id}
                  title={props.title + "[" + head.id + ": " + n_car.id + "]"}
                  icon="dot-circle"
                  onClick={e => props.onClick(head.id, n_car.id)}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default MoveHeadsButtons;

import React from "react";
import Switch from "../../../components/Switch";

const ToggleActuator = props => {
  return (
    <Switch
      label={props.label}
      checked={props.value}
      onChange={props.onChange}
    />
  );
};

export default ToggleActuator;

import React from "react";

const Switch = props => {
  let id = props.id ? props.id : props.label.replace(" ", "");
  return (
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className="custom-control-input"
        id={id}
        checked={props.checked}
        onChange={e => {
          props.onChange(Number(e.target.checked));
        }}
      />
      <label className="custom-control-label" htmlFor={id}>
        {props.label}
      </label>
    </div>
  );
};

export default Switch;

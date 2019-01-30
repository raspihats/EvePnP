import React from "react";

const CheckBox = props => {
  return (
    <div className="form-check">
      <input
        className={"form-check-input" + (props.label ? "" : " position-static")}
        type="checkbox"
        checked={props.checked ? props.checked : false}
        id={props.label}
        onChange={e => props.onChange(e.target.value)}
      />
      {props.label && (
        <label className="form-check-label" htmlFor={props.label}>
          {props.label}
        </label>
      )}
    </div>
  );
};

export default CheckBox;

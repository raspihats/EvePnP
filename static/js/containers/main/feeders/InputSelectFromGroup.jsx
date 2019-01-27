import React from "react";

const InputSelectFormGroup = props => {
  let targetId = "inputSelect" + props.label;
  return (
    <div className="form-group">
      <label htmlFor={targetId}>{props.label}</label>
      <select
        className="form-control"
        id={targetId}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default InputSelectFormGroup;

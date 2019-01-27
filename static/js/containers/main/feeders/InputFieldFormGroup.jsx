import React from "react";

const InputFieldFormGroup = props => {
  let targetId = "inputText" + props.label;
  return (
    <div className="form-group">
      <label htmlFor={targetId}>{props.label}</label>
      <input
        type={props.type ? props.type : "text"}
        className="form-control"
        id={targetId}
        // placeholder="1234 Main St"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

export default InputFieldFormGroup;

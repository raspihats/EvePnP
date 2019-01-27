import React from "react";
import InputField from "../../../components/InputField";

const ComponentFormGroup = props => {
  return (
    <div className="form-group mb-1">
      <label htmlFor="code">Component:</label>
      <div className="form-row">
        {Object.keys(props.component).map(key => (
          <div key={key} className="form-group col-md-6 mb-1">
            <InputField
              prepend={key + ":"}
              value={props.component[key]}
              onChange={e => {
                props.onChange(key, e.target.value);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentFormGroup;

import React from "react";
import InputField from "../../../components/InputField";
import PositionButtons from "./PositionButtons";

const PointFormGroup = props => {
  return (
    <div className="form-group">
      <label htmlFor="code">Point:</label>
      <div className="form-row">
        <div className="form-group col-6 mb-1">
          {Object.keys(props.point).map(axis => (
            <InputField
              type="number"
              key={axis}
              prepend={axis + ":"}
              value={props.point[axis]}
              onChange={e => {
                props.onChange(axis, parseFloat(e.target.value));
              }}
            />
          ))}
        </div>
        <div className="form-group col-6 mb-1">
          <PositionButtons
            title="Capture position"
            onClick={positions => {
              Object.keys(positions).forEach(axis =>
                props.onChange(axis, positions[axis])
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PointFormGroup;

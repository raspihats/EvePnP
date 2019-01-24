import React from "react";
import {
  InputGroup,
  InputGroupPrepend,
  InputGroupText
} from "../../components/InputGroup";

const AxisPosition = props => {
  return (
    <InputGroup small>
      <InputGroupPrepend>
        <InputGroupText>{props.axis}</InputGroupText>
      </InputGroupPrepend>
      <input
        type="text"
        className="form-control text-right"
        maxLength="5"
        size="5"
        value={props.position}
        onChange={e => {}}
      />
    </InputGroup>
  );
};

export default AxisPosition;

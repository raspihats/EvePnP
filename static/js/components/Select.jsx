import React from "react";
import {
  InputGroup,
  InputGroupPrepend,
  InputGroupAppend,
  InputGroupText
} from "./InputGroup";

const Select = props => {
  const options = props.options.map(option => (
    <option key={option}>{option}</option>
  ));

  return (
    <InputGroup {...props}>
      <InputGroupPrepend>
        {typeof props.prepend == "string" || props.prepend instanceof String ? (
          <InputGroupText>{props.prepend}</InputGroupText>
        ) : (
          props.prepend
        )}
      </InputGroupPrepend>
      <select className="custom-select" id={props.id}>
        {options}
      </select>
      <InputGroupAppend>
        {typeof props.append == "string" || props.append instanceof String ? (
          <InputGroupText>{props.append}</InputGroupText>
        ) : (
          props.append
        )}
      </InputGroupAppend>
    </InputGroup>
  );
};

export default Select;

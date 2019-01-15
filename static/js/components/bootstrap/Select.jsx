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
    <InputGroup size={props.size}>
      <InputGroupPrepend>
        <InputGroupText>{props.prepend}</InputGroupText>
      </InputGroupPrepend>
      <select className="custom-select" id={props.id}>
        {options}
      </select>
      <InputGroupAppend />
    </InputGroup>
  );
};

export default Select;

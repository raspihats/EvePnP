import React from "react";
import {
  InputGroup,
  InputGroupPrepend,
  InputGroupAppend,
  InputGroupText
} from "./InputGroup";
import { isString, isValid } from "../utils";

const SelectInputGroup = props => {
  return (
    <InputGroup small={props.small}>
      {isValid(props.prepend) && (
        <InputGroupPrepend>
          {isString(props.prepend) ? (
            <InputGroupText>{props.prepend}</InputGroupText>
          ) : (
            props.prepend
          )}
        </InputGroupPrepend>
      )}
      <select
        id={props.id}
        className="custom-select"
        disabled={props.disabled}
        onChange={e => {
          e.target.blur();
          // this.setState({ value: e.target.value });
          props.onChange(e.target.value);
        }}
        value={props.value}
      >
        {props.options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
      {isValid(props.append) && (
        <InputGroupAppend>
          {isString(props.append) ? (
            <InputGroupText>{props.append}</InputGroupText>
          ) : (
            props.append
          )}
        </InputGroupAppend>
      )}
    </InputGroup>
  );
};

export default SelectInputGroup;

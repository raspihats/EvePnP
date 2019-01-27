import React from "react";
import {
  InputGroup,
  InputGroupPrepend,
  InputGroupAppend,
  InputGroupText
} from "../components/InputGroup";
import { isString } from "../utils";

const InputField = props => {
  const prepend = props.prepend;
  return (
    <InputGroup>
      {props.prepend && (
        <InputGroupPrepend>
          {isString(props.prepend) ? (
            <InputGroupText>{props.prepend}</InputGroupText>
          ) : (
            props.prepend
          )}
        </InputGroupPrepend>
      )}
      <input
        type={props.type ? props.type : "text"}
        className="form-control"
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.append && (
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

export default InputField;

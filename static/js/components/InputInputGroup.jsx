import React from "react";
import {
  InputGroup,
  InputGroupPrepend,
  InputGroupAppend,
  InputGroupText
} from "../components/InputGroup";
import { isString, isValid } from "../utils";

const InputInputGroup = props => {
  let type = props.type ? props.type : "text";
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
      <input
        type={type}
        className="form-control"
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={e => {
          props.onChange(e.target.value);
        }}
        min={props.range && type == "number" && props.range.min}
        max={props.range && type == "number" && props.range.max}
        step={props.range && type == "number" && props.range.step}
        size={props.size && type == "text" && props.size}
        list={isValid(props.id) && isValid(props.options) && "list" + props.id}
      />
      {isValid(props.options) && (
        <datalist id={isValid(props.id) && "list" + props.id}>
          {props.options.map((element, index) => {
            return <option key={index}>{element}</option>;
          })}
        </datalist>
      )}
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

export default InputInputGroup;

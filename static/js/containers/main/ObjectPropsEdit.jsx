import React from "react";
import InputInputGroup from "../../components/InputInputGroup";

const ObjectPropsEdit = props => {
  let type = props.type ? props.type : "text";
  return (
    <div className={props.inline && "form-inline"}>
      {Object.keys(props.object).map(key => (
        <InputInputGroup
          key={key}
          small
          type={type}
          range={props.range}
          prepend={key}
          value={props.object[key]}
          onChange={value => {
            let object = { ...props.object };
            object[key] = parseFloat(value);
            props.onChange(object);
          }}
        />
      ))}
    </div>
  );
};

export default ObjectPropsEdit;

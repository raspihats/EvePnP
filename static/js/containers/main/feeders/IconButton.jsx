import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = props => {
  return (
    <button
      className="btn btn-outline-secondary btn-lg px-1 py-0"
      type="button"
      title={props.title}
      onClick={e => {
        // e.preventDefault();
        // e.target.blur();
        props.onClick(e.target.value);
      }}
    >
      <FontAwesomeIcon icon={props.icon} />
    </button>
  );
};

export default IconButton;

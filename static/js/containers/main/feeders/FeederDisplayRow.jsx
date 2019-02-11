import React from "react";
import ObjectProps from "../ObjectProps";
import MoveHeadButtons from "../MoveHeadButtons";
import IconButton from "../IconButton";

const FeederDisplayRow = props => {
  let { head, feeder, onEdit, onReload } = props;
  return (
    <tr>
      <th scope="row" className="align-middle">
        {feeder.id}
      </th>
      <td className="align-middle">{feeder.type}</td>
      <td className="align-middle">
        <ObjectProps object={feeder.component} />
      </td>
      <td className="align-middle">
        <span className="p-1">{feeder.count}</span>/
        <span className="font-weight-bold p-1">{feeder.size}</span>
      </td>
      <td className="align-middle">
        <ObjectProps object={feeder.point} />
      </td>
      <td className="align-middle">
        <MoveHeadButtons head={head} point={feeder.point} />
        <div className="float-right">
          <IconButton
            title="Edit feeder"
            icon="pen-square"
            onClick={e => onEdit()}
          />
        </div>
        <div className="float-right">
          <IconButton
            title="Reload feeder"
            icon="redo"
            onClick={e => {
              let updatedFeeder = { ...feeder };
              updatedFeeder.count = updatedFeeder.size;
              onReload(updatedFeeder, () => {});
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default FeederDisplayRow;

import React from "react";

const Row = props => {
  return (
    <tr className="text-muted">
      <th scope="row">{props.data.name}</th>
      <td>{props.data.value}</td>
      <td>{props.data.package}</td>
      <td>{props.data.x}</td>
      <td>{props.data.y}</td>
      <td>{props.data.angle}</td>
      <td>{props.data.type}</td>
      <td>{props.data.type}</td>
    </tr>
  );
};

const JobDetails = props => {
  return (
    <table id="jobDetails" className="table table-hover table-sm border">
      <thead className="text-secondary">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Value</th>
          <th scope="col">Package</th>
          <th scope="col">X</th>
          <th scope="col">Y</th>
          <th scope="col">θ</th>
          <th scope="col">Type</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {props.job.components.map((element, index) => {
          return <Row data={element} key={element.name + "_" + index} />;
        })}
      </tbody>
    </table>
  );
};

export default JobDetails;

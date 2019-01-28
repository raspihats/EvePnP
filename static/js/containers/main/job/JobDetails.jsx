import React from "react";
import ComponentDisplay from "../ComponentDisplay";
import PointDisplay from "../PointDisplay";

const JobDetails = props => {
  return (
    <React.Fragment>
      <div className="row border bg-light py-2 text-info font-weight-bold">
        <div className="col-2">ID</div>
        <div className="col-3">Component</div>
        <div className="col-2">Point</div>
        <div className="col-1">Rotation</div>
        <div className="col-2">Operation</div>
        <div className="col-2">Action</div>
      </div>
      {props.job.components.map((component, index) => {
        let cmp = { value: component.value };
        component.package && (cmp.package = component.package);
        component.footprint && (cmp.footprint = component.footprint);
        return (
          <div key={component.id} className="row text-info border border-top-0">
            <div className="col-2">{component.id}</div>
            <div className="col-3">
              <ComponentDisplay {...cmp} />
            </div>
            <div className="col-2">
              <PointDisplay {...component} />
            </div>
            <div className="col-1">{component.angle}</div>
            <div className="col-2">{component.operation}</div>
            {/* <div className="col-2">
              <div className="row">
                <div className="col-12">
                  <OffsetButtons
                    title="Move"
                    onClick={offset => {
                      let positions = {};
                      Object.keys(feeder.point).map(key => {
                        positions[key] = feeder.point[key];
                        if (offset.hasOwnProperty(key)) {
                          positions[key] += offset[key];
                        }
                      });
                      api.axis.positions.update(positions);
                    }}
                  />
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-block btn-outline-secondary btn-lg px-1 py-0"
                    type="button"
                    title="Show edit panel"
                    data-toggle="collapse"
                    data-target={"#" + feeder.id}
                    aria-expanded="false"
                    aria-controls={feeder.id}
                    onClick={e => console.log(e)}
                  >
                    <FontAwesomeIcon icon="angle-double-down" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="collapse" id={feeder.id}>
                <UpdateForm
                  feeder={feeder}
                  onUpdate={updatedFeeder =>
                    this.updateFeeder(feeder.id, updatedFeeder)
                  }
                />
              </div>
            </div> */}
          </div>
        );
      })}
    </React.Fragment>
    // <table id="jobDetails" className="table table-hover table-sm border">
    //   <thead className="text-secondary">
    //     <tr>
    //       <th scope="col">ID</th>
    //       <th scope="col">Value</th>
    //       <th scope="col">Package</th>
    //       <th scope="col">X</th>
    //       <th scope="col">Y</th>
    //       <th scope="col">θ</th>
    //       <th scope="col">Type</th>
    //       <th scope="col">Action</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {props.job.components.map((element, index) => {
    //       return <Row data={element} key={element.name + "_" + index} />;
    //     })}
    //   </tbody>
    // </table>
  );
};

export default JobDetails;

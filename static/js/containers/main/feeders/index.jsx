import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../../api";
import ComponentDisplay from "../ComponentDisplay";
import PointDisplay from "../PointDisplay";
import OffsetButtons from "./OffsetButtons";
import UpdateForm from "./UpdateForm";

class Feeders extends React.Component {
  state = { feeders: [], editId: null };

  listFeeders() {
    api.feeders.list(data => this.setState({ feeders: data }));
  }

  updateFeeder(id, feeder) {
    api.feeders.update(id, feeder, () => this.listFeeders());
  }

  componentWillMount() {
    this.listFeeders();
  }

  render() {
    return (
      <React.Fragment>
        <div className="row border bg-light py-2 text-info font-weight-bold">
          <div className="col-2">ID</div>
          <div className="col-2">Type</div>
          <div className="col-1">Size</div>
          <div className="col-1">Count</div>
          <div className="col-2">Component</div>
          <div className="col-2">Point</div>
          <div className="col-2">Action</div>
        </div>
        {this.state.feeders.map(feeder => {
          return (
            <div key={feeder.id} className="row text-info border border-top-0">
              <div className="col-2">{feeder.id}</div>
              <div className="col-2">{feeder.type}</div>
              <div className="col-1">{feeder.size}</div>
              <div className="col-1">{feeder.count}</div>
              <div className="col-2">
                <ComponentDisplay {...feeder.component} />
              </div>
              <div className="col-2">
                <PointDisplay {...feeder.point} />
              </div>
              <div className="col-2">
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

              {/* {feeder.id === this.state.editId && ( */}
              <div className="col-12">
                <div className="collapse" id={feeder.id}>
                  <UpdateForm
                    feeder={feeder}
                    onUpdate={updatedFeeder =>
                      this.updateFeeder(feeder.id, updatedFeeder)
                    }
                  />
                </div>
              </div>
              {/* )} */}
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Feeders;

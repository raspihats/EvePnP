import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../../api";
import ObjectProps from "../ObjectProps";
import OffsetButtons from "../OffsetButtons";
import {
  Collapsible,
  CollapsibleControlButton
} from "../../../components/Collapsible";
import UpdateForm from "./UpdateForm";

class Feeders extends React.Component {
  state = { feeders: [], heads: [] };

  listHeads() {
    api.heads.list(data => this.setState({ heads: data }));
  }

  listFeeders() {
    api.feeders.list(data => this.setState({ feeders: data }));
  }

  updateFeeder(id, feeder) {
    api.feeders.update(id, feeder, () => this.listFeeders());
  }

  componentDidMount() {
    this.listHeads();
    this.listFeeders();
  }

  render() {
    return (
      <div className="container-fluid">
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
                <ObjectProps object={feeder.component} />
              </div>
              <div className="col-2">
                <ObjectProps object={feeder.point} />
              </div>
              <div className="col-2">
                <div className="row">
                  <div className="col-12">
                    <OffsetButtons
                      title="Move"
                      heads={this.state.heads}
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
                    <CollapsibleControlButton
                      className="btn-block btn-outline-secondary btn-lg px-1 py-0"
                      title="Show edit panel"
                      target={feeder.id}
                    >
                      <FontAwesomeIcon icon="angle-double-down" />
                      <FontAwesomeIcon icon="angle-double-up" />
                    </CollapsibleControlButton>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <Collapsible id={feeder.id}>
                  <UpdateForm
                    heads={this.state.heads}
                    feeder={feeder}
                    onUpdate={updatedFeeder =>
                      this.updateFeeder(feeder.id, updatedFeeder)
                    }
                  />
                </Collapsible>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Feeders;

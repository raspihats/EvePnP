import React from "react";
import api from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ObjectProps from "../ObjectProps";
import OffsetButtons from "../OffsetButtons";
import {
  Collapsible,
  CollapsibleControlButton
} from "../../../components/Collapsible";

class JobComponents extends React.Component {
  state = { heads: [] };

  componentDidMount() {
    api.heads.list(data => this.setState({ heads: data }));
  }

  render() {
    return (
      <React.Fragment>
        <div className="h4 text-info font-weight-bold">Components:</div>
        <table className="table table-borderless text-info">
          <thead>
            <tr className="border bg-light">
              <th scope="col">ID</th>
              <th scope="col">Value</th>
              <th scope="col">Package</th>
              <th scope="col">Offset</th>
              <th scope="col">Rotation</th>
              <th scope="col">Operation</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.job.components.map((component, index) => {
              return (
                <React.Fragment key={component.id}>
                  <tr className="border-left border-right">
                    <th scope="row">{component.id}</th>
                    <td>{component.value}</td>
                    <td>{component.package}</td>
                    <td>
                      <ObjectProps object={component.offset} />
                    </td>
                    <td>{component.rotation}</td>
                    <td>{component.operation}</td>
                    <td>
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
                            target={component.id}
                          >
                            <FontAwesomeIcon icon="angle-double-down" />
                            <FontAwesomeIcon icon="angle-double-up" />
                          </CollapsibleControlButton>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border border-top-0">
                    <td colSpan="7" className="py-0">
                      <Collapsible id={component.id}>
                        <hr className="m-0 px-2" />
                        asd
                      </Collapsible>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default JobComponents;

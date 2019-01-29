import React from "react";
import api from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Collapsible,
  CollapsibleControlButton
} from "../../../components/Collapsible";
import ObjectProps from "../ObjectProps";
import OffsetButtons from "../OffsetButtons";
import UpdateBoardForm from "./UpdateBoardForm";

class JobBoards extends React.Component {
  state = { heads: [] };

  componentDidMount() {
    api.heads.list(data => this.setState({ heads: data }));
  }

  render() {
    return (
      <React.Fragment>
        <div className="h4 text-info font-weight-bold">Boards:</div>
        <table className="table table-borderless text-info">
          <thead>
            <tr className="border bg-light">
              <th scope="col">ID</th>
              <th scope="col">Reference</th>
              <th scope="col">Origin</th>
              <th scope="col">Rotation</th>
              <th scope="col">Operation</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.job.boards.map((board, index) => {
              return (
                <React.Fragment key={board.id}>
                  <tr className="border-left border-right">
                    <th scope="row">{board.id}</th>
                    <td>ref</td>
                    <td>
                      <ObjectProps object={board.origin} />
                    </td>
                    <td>{board.rotation}</td>
                    <td>{board.operation}</td>
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
                            target={board.id}
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
                      <Collapsible id={board.id}>
                        <hr className="mt-0 px-2" />
                        <UpdateBoardForm
                          heads={this.state.heads}
                          board={board}
                        />
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

export default JobBoards;

import React from "react";
import api from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Collapsible,
  CollapsibleControlButton
} from "../../../components/Collapsible";
import CheckBox from "../../../components/CheckBox";
import ObjectProps from "../ObjectProps";
import OffsetButtons from "../OffsetButtons";
import UpdateBoardForm from "./UpdateBoardForm";
import { timingSafeEqual } from "crypto";

class JobBoards extends React.Component {
  // state = { heads: [], refId: null };

  // changeRefId() {
  //   this.props.onRefIdChange();
  // }

  // componentDidMount() {
  //   api.heads.list(data => this.setState({ heads: data }));
  //   this.setState({ refId: this.props.boards[0].id });
  // }

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
                    <td>
                      <CheckBox
                        checked={
                          board.id === this.props.referenceId ? true : false
                        }
                        onChange={value =>
                          value && this.props.onReferenceIdChange(board.id)
                        }
                      />
                    </td>
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
                            heads={this.props.heads}
                            onClick={offset => {
                              let origin = { ...board.origin }; //shallow clone
                              Object.keys(offset).forEach(key => {
                                if (origin.hasOwnProperty(key)) {
                                  origin[key] += offset[key];
                                }
                              });
                              api.axis.positions.update(origin);
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
                        <hr
                          className="mt-0 px-2"
                          style={{ borderStyle: "dotted" }}
                        />
                        <UpdateBoardForm
                          heads={this.props.heads}
                          board={board}
                          onUpdate={updatedBoard => {
                            let job = { ...this.props.job };
                            job.boards.forEach(b => {
                              if (b.id === board.id) {
                                b = updatedBoard;
                              }
                            });
                            api.jobs.update(job.id, job);
                          }}
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

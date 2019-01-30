import React from "react";
import InputFormGroup from "../../../components/InputFormGroup";
import SelectFormGroup from "../../../components/SelectFromGroup";
import PointFormGroup from "../feeders/PointFormGroup";

class UpdateBoardForm extends React.Component {
  state = { board: null };

  componentWillMount() {
    this.setState({ board: { ...this.props.board } });
  }

  render() {
    return (
      <form>
        <div className="form-row">
          <div className="col-md-2">
            <InputFormGroup
              // className="col-md-3"
              label="ID:"
              value={this.state.board.id}
              onChange={value => {
                let board = { ...this.state.board };
                board.id = value;
                this.setState({ board: board });
              }}
            />
          </div>
          <div className="col-md-6">
            <PointFormGroup
              label="Origin:"
              point={this.state.board.origin}
              heads={this.props.heads}
              onChange={(axis, value) => {
                let board = { ...this.state.board };
                board.origin[axis] = value;
                this.setState({ board: board });
              }}
            />
          </div>
          <div className="col-md-2">
            <InputFormGroup
              // className="col-md-3"
              label="Rotation:"
              type="number"
              value={this.state.board.rotation}
              onChange={value => {
                let board = { ...this.state.board };
                board = parseFloat(value);
                this.setState({ board: board });
              }}
            />
          </div>
          <div className="col-md-2">
            <SelectFormGroup
              label="Operation:"
              options={["place", "ignore"]}
              value={this.state.board.operation}
              onChange={value => {
                let board = { ...this.state.board };
                board.operation = value;
                this.setState({ board: board });
              }}
            />
          </div>
          <div className="col-12">
            <button
              className="btn btn-block btn-primary btn-lg"
              type="button"
              title="Update board"
              onClick={e => {
                this.props.onUpdate(this.state.board);
              }}
            >
              Update
              {/* <FontAwesomeIcon icon={props.icon} /> */}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default UpdateBoardForm;

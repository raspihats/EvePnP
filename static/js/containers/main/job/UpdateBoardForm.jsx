import React from "react";
import InputFormGroup from "../../../components/InputFormGroup";
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
          <div className="col-md-3">
            <InputFormGroup
              // className="col-md-3"
              label="ID:"
              value={this.state.board.id}
              onChange={value => {
                let board = this.state.board;
                board.id = value;
                this.setState({ board: board });
              }}
            />
            <InputFormGroup
              // className="col-md-3"
              label="Rotation:"
              type="number"
              value={this.state.board.rotation}
              onChange={value => {
                let board = this.state.board;
                board = parseFloat(value);
                this.setState({ board: board });
              }}
            />
          </div>
          <div className="col-md-3">
            <PointFormGroup
              point={this.state.board.origin}
              heads={this.props.heads}
              onChange={(axis, value) => {
                let board = this.state.board;
                board.origin[axis] = value;
                this.setState({ board: board });
              }}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default UpdateBoardForm;

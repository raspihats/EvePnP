import React from "react";
import CheckBox from "../../../components/CheckBox";
import SelectInputGroup from "../../../components/SelectInputGroup";
import InputInputGroup from "../../../components/InputField";
import ObjectProps from "../ObjectProps";
import MoveHeadButtons from "../MoveHeadButtons";
import IconButton from "../IconButton";
import UpdateBoardForm from "./UpdateBoardForm";

const BoardDisplayRow = props => {
  let { board } = props;
  return (
    <tr>
      <th scope="row" className="align-middle">
        {board.id}
      </th>
      <td className="align-middle">
        <CheckBox
          checked={props.reference}
          onChange={value => value && props.onSetReferenceId()}
        />
      </td>
      <td className="align-middle">
        <ObjectProps object={board.origin} inline />
      </td>
      <td className="align-middle">{board.rotation}</td>
      <td className="align-middle">{board.operation}</td>
      <td className="align-middle">
        <MoveHeadButtons title="Move" head={props.head} point={board.origin} />
        <div className="float-right">
          <IconButton
            title="Edit component"
            icon="pen-square"
            onClick={e => props.onEdit()}
          />
        </div>
      </td>
    </tr>
  );
};

class BoardEditRow extends React.Component {
  state = {
    board: this.props.board,
    updating: false
  };

  render() {
    let { head, operations } = this.props;
    let board = { ...this.state.board };
    return (
      <tr>
        <th scope="row" className="align-middle">
          <InputInputGroup
            small
            id={board.id}
            value={board.id}
            onChange={value => {
              board.id = value;
              this.setState({ board: board });
            }}
          />
        </th>
        <td className="align-middle">
          <CheckBox
            checked={this.props.reference}
            onChange={value => value && this.props.onSetReferenceId()}
          />
        </td>
        <td className="align-middle">
          <ObjectProps object={board.origin} inline />
        </td>
        <td className="align-middle">
          <InputInputGroup
            small
            id={"rotation" + board.id}
            value={board.rotation}
            options={[0, 45, 90, 135, 180, 225, 270]}
            size="6"
            onChange={value => {
              board.rotation = parseFloat(value);
              this.setState({ board: board });
            }}
          />
        </td>
        <td className="align-middle">
          <SelectInputGroup
            small
            options={operations}
            value={board.operation}
            onChange={value => {
              board.operation = value;
              this.setState({ board: board });
            }}
          />
        </td>
        <td className="align-middle">
          <MoveHeadButtons title="Move" head={head} point={board.origin} />
          <div className="float-right">
            {this.state.updating ? (
              <FontAwesomeIcon icon="spinner" spin />
            ) : (
              <React.Fragment>
                <IconButton
                  title="Update component"
                  icon="save"
                  onClick={e => {
                    this.setState({ updating: true });
                    this.props.onUpdate(board, () => {
                      this.setState({ updating: false });
                    });
                  }}
                />
                <IconButton
                  title="Discard changes"
                  icon="times-circle"
                  onClick={e => {
                    this.setState({ board: this.props.board });
                    this.props.onDiscard();
                  }}
                />
              </React.Fragment>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

class JobBoards extends React.Component {
  state = { editIds: [], referenceId: null };

  addEditId(id) {
    let editIds = [...this.state.editIds];
    if (editIds.indexOf(id) === -1) {
      editIds.push(id);
    }
    this.setState({ editIds: editIds });
  }

  removeEditId(id) {
    let editIds = [...this.state.editIds];
    let index = editIds.indexOf(id);
    if (index !== -1) {
      editIds.splice(index, 1);
    }
    this.setState({ editIds: editIds });
  }

  componentDidMount() {
    let board = this.props.job.boards[0];
    this.setState({ referenceId: board.id });
    this.props.onSetOrigin(board.origin);
  }

  render() {
    return (
      <React.Fragment>
        <div className="h4 text-info font-weight-bold">Boards:</div>
        <table className="table text-info">
          <thead>
            <tr className="bg-light">
              <th scope="col">ID</th>
              <th scope="col">Reference</th>
              <th scope="col">Origin</th>
              <th scope="col">Rotation</th>
              <th scope="col">Operation</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="border-bottom">
            {this.props.job.boards.map(board =>
              this.state.editIds.indexOf(board.id) === -1 ? (
                <BoardDisplayRow
                  key={board.id}
                  head={this.props.head}
                  board={board}
                  reference={this.state.referenceId === board.id}
                  onSetReferenceId={() => {
                    this.setState({ referenceId: board.id });
                    this.props.onSetOrigin(board.origin);
                  }}
                  onEdit={() => this.addEditId(board.id)}
                />
              ) : (
                <BoardEditRow
                  key={board.id}
                  head={this.props.head}
                  board={board}
                  operations={this.props.operations}
                  onSetReferenceId={() => {
                    this.setState({ referenceId: board.id });
                    this.props.onSetOrigin(board.origin);
                  }}
                  onUpdate={(updatedBoard, callback) => {
                    this.props.onUpdateComponent(board.id, updatedBoard, () => {
                      callback();
                      this.removeEditId(board.id);
                    });
                  }}
                  onDiscard={() => this.removeEditId(board.id)}
                />
              )
            )}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default JobBoards;

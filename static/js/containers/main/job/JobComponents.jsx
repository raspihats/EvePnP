import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectInputGroup from "../../../components/SelectInputGroup";
import InputInputGroup from "../../../components/InputInputGroup";
import ObjectProps from "../ObjectProps";
import MoveHeadButtons from "../MoveHeadButtons";
import IconButton from "../IconButton";
import { addPoints } from "../../../utils";
import PointEdit from "../PointEdit";

const ComponentDisplayRow = props => {
  let { head, packages, origin, component, status } = props;
  let classOperation;
  if (component.operation === "ignore") {
    classOperation = "text-warning";
  } else if (status && status.components_ids.indexOf(component.id) !== -1) {
    classOperation = "text-white bg-success";
  }
  return (
    <tr>
      <th scope="row" className="align-middle">
        {component.id}
      </th>
      <td className="align-middle">{component.value}</td>
      <td className="align-middle">
        {packages.indexOf(component.package) !== -1
          ? component.package
          : "???" + component.package}
      </td>
      <td className="align-middle">
        <ObjectProps object={component.offset} inline />
      </td>
      <td className="align-middle">{component.rotation}</td>
      <td className={"align-middle " + classOperation}>
        {component.operation}
      </td>
      <td className="align-middle">
        <MoveHeadButtons
          head={head}
          point={addPoints(origin, component.offset)}
        />
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

class ComponentEditRow extends React.Component {
  state = {
    component: this.props.component,
    updating: false
  };

  render() {
    let { head, packages, operations, origin } = this.props;
    let component = { ...this.state.component };

    return (
      <tr>
        <th scope="row" className="align-middle">
          <InputInputGroup
            small
            id={component.id}
            value={component.id}
            size="15"
            onChange={value => {
              component.id = value;
              this.setState({ component: component });
            }}
          />
        </th>
        <td className="align-middle">
          <InputInputGroup
            small
            id={"value" + component.id}
            value={component.value}
            size="15"
            onChange={value => {
              component.value = value;
              this.setState({ component: component });
            }}
          />
        </td>
        <td className="align-middle">
          <SelectInputGroup
            small
            options={packages}
            value={component.package}
            onChange={value => {
              component.package = value;
              this.setState({ component: component });
            }}
          />
        </td>
        <td className="align-middle">
          <PointEdit
            inline
            head={head}
            point={component.offset}
            onChange={value => {
              component.offset = value;
              this.setState({ component: component });
            }}
          />
        </td>
        <td className="align-middle">
          <InputInputGroup
            small
            id={"rotation" + component.id}
            type="number"
            value={component.rotation}
            options={[0, 45, 90, 135, 180, 225, 270]}
            range={{ min: 0.0, max: 360.0, step: 0.01 }}
            onChange={value => {
              component.rotation = parseFloat(value);
              this.setState({ component: component });
            }}
          />
        </td>
        <td className="align-middle">
          <SelectInputGroup
            small
            options={operations}
            value={component.operation}
            onChange={value => {
              component.operation = value;
              this.setState({ component: component });
            }}
          />
        </td>
        <td className="align-middle">
          <MoveHeadButtons
            head={head}
            point={addPoints(origin, component.offset)}
          />
          <div className="float-right">
            {this.state.updating ? (
              <FontAwesomeIcon icon="spinner" spin />
            ) : (
              <React.Fragment>
                <IconButton
                  title="Save changes"
                  icon="save"
                  onClick={e => {
                    this.setState({ updating: true });
                    this.props.onUpdate(component, () => {
                      this.setState({ updating: false });
                    });
                  }}
                />
                <IconButton
                  title="Discard changes"
                  icon="times-circle"
                  onClick={e => {
                    this.setState({ component: this.props.component });
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

class JobComponents extends React.Component {
  state = { editIds: [] };

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

  render() {
    return (
      <React.Fragment>
        <div className="h4 text-info font-weight-bold">Components:</div>
        <table className="table table-sm text-info">
          <thead>
            <tr className="bg-light">
              <th scope="col">ID</th>
              <th scope="col">Value</th>
              <th scope="col">Package</th>
              <th scope="col">Offset</th>
              <th scope="col">Rotation</th>
              <th scope="col">Operation</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="border-bottom">
            {this.props.job.components.map(component =>
              this.state.editIds.indexOf(component.id) === -1 ? (
                <ComponentDisplayRow
                  key={component.id}
                  head={this.props.head}
                  packages={this.props.packages}
                  origin={this.props.origin}
                  component={component}
                  status={this.props.job.status}
                  onEdit={() => this.addEditId(component.id)}
                />
              ) : (
                <ComponentEditRow
                  key={component.id}
                  origin={this.props.origin}
                  component={component}
                  head={this.props.head}
                  packages={this.props.packages}
                  operations={this.props.operations}
                  onUpdate={(updatedComponent, callback) => {
                    this.props.onUpdateComponent(
                      component.id,
                      updatedComponent,
                      () => {
                        callback();
                        this.removeEditId(component.id);
                      }
                    );
                  }}
                  onDiscard={() => this.removeEditId(component.id)}
                />
              )
            )}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default JobComponents;

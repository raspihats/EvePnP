import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../../api";
import SelectInputGroup from "../../../components/SelectInputGroup";
import InputInputGroup from "../../../components/InputField";
import ObjectProps from "../ObjectProps";
import IconButton from "../IconButton";
import MoveHeadsButtons from "../MoveHeadsButtons";

const ComponentDisplayRow = props => {
  let { heads, packages, component } = props;
  return (
    <tr className="border-left border-right">
      <th scope="row">{component.id}</th>
      <td>{component.value}</td>
      <td>
        {packages.indexOf(component.package) !== -1
          ? component.package
          : "???" + component.package}
      </td>
      <td>
        <ObjectProps object={component.offset} inline />
      </td>
      <td>{component.rotation}</td>
      <td
        className={
          component.operation === "ignore" ? "text-warning" : undefined
        }
      >
        {component.operation}
      </td>
      <td>
        <MoveHeadsButtons
          title="Move"
          heads={heads}
          onClick={offset => {
            let point = { ...this.props.origin };
            Object.keys(point).forEach(key => {
              // component offset
              component.offset.hasOwnProperty(key) &&
                (point[key] += component.offset[key]);
              // head offset
              offset.hasOwnProperty(key) && (point[key] += offset[key]);
            });
            // api.axis.positions.update(point);
          }}
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
    let { heads, packages, operations } = this.props;
    let component = { ...this.state.component };
    return (
      <tr className="border-left border-right">
        <th scope="row">
          <InputInputGroup
            small
            id={component.id}
            value={component.id}
            onChange={value => {
              component.id = value;
              this.setState({ component: component });
            }}
          />
        </th>
        <td>
          <InputInputGroup
            small
            id={"value" + component.id}
            value={component.value}
            onChange={value => {
              component.value = value;
              this.setState({ component: component });
            }}
          />
        </td>
        <td>
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
        <td>
          <ObjectProps object={component.offset} inline />
        </td>
        <td>
          <InputInputGroup
            small
            id={"rotation" + component.id}
            value={component.rotation}
            options={[0, 45, 90, 135, 180, 225, 270]}
            size="6"
            onChange={value => {
              component.rotation = parseFloat(value);
              this.setState({ component: component });
            }}
          />
        </td>
        <td>
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
        <td>
          <MoveHeadsButtons
            title="Move"
            heads={heads}
            onClick={offset => {
              let point = { ...this.props.origin };
              Object.keys(point).forEach(key => {
                // component offset
                component.offset.hasOwnProperty(key) &&
                  (point[key] += component.offset[key]);
                // head offset
                offset.hasOwnProperty(key) && (point[key] += offset[key]);
              });
              api.axis.positions.update(point);
            }}
          />
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

  render() {
    return (
      <React.Fragment>
        <div className="h4 text-info font-weight-bold">Components:</div>
        <table className="table table-sm text-info">
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
              return this.state.editIds.indexOf(component.id) === -1 ? (
                <ComponentDisplayRow
                  key={component.id}
                  component={component}
                  heads={this.props.heads}
                  packages={this.props.packages}
                  onEdit={() => {
                    let editIds = [...this.state.editIds];
                    if (editIds.indexOf(component.id) === -1) {
                      editIds.push(component.id);
                    }
                    this.setState({ editIds: editIds });
                  }}
                />
              ) : (
                <ComponentEditRow
                  key={component.id}
                  component={component}
                  heads={this.props.heads}
                  packages={this.props.packages}
                  operations={this.props.operations}
                  onUpdate={(updatedComponent, callback) => {
                    this.props.onUpdateComponent(
                      component.id,
                      updatedComponent,
                      () => {
                        callback();
                        let editIds = [...this.state.editIds];
                        let index = editIds.indexOf(component.id);
                        if (index !== -1) {
                          editIds.splice(index, 1);
                        }
                        this.setState({ editIds: editIds });
                      }
                    );
                  }}
                  onDiscard={() => {
                    let editIds = [...this.state.editIds];
                    let index = editIds.indexOf(component.id);
                    if (index !== -1) {
                      editIds.splice(index, 1);
                    }
                    this.setState({ editIds: editIds });
                  }}
                />
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default JobComponents;

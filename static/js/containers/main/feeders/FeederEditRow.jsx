import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectInputGroup from "../../../components/SelectInputGroup";
import InputInputGroup from "../../../components/InputInputGroup";
import ObjectPropsEdit from "../ObjectPropsEdit";
import PointEdit from "../PointEdit";
import MoveHeadButtons from "../MoveHeadButtons";
import IconButton from "../IconButton";
import CodeEditor from "./CodeEditor";

class FeederEditRow extends React.Component {
  state = {
    feeder: this.props.feeder,
    updating: false
  };

  render() {
    let { head, types } = this.props;
    let feeder = { ...this.state.feeder };
    return (
      <React.Fragment>
        <tr>
          <th scope="row" className="align-middle">
            <InputInputGroup
              small
              id={feeder.id}
              value={feeder.id}
              size="15"
              onChange={value => {
                feeder.id = value;
                this.setState({ feeder: feeder });
              }}
            />
          </th>
          <td className="align-middle">
            <SelectInputGroup
              small
              options={types}
              value={feeder.type}
              onChange={value => {
                feeder.type = value;
                this.setState({ feeder: feeder });
              }}
            />
          </td>
          <td className="align-middle">
            <ObjectPropsEdit
              object={feeder.component}
              onChange={value => {
                feeder.component = value;
                this.setState({ feeder: feeder });
              }}
            />
          </td>
          <td className="align-middle">
            <ObjectPropsEdit
              type="number"
              range={{ min: 0, max: 10000, step: 1 }}
              object={{ count: feeder.count, size: feeder.size }}
              onChange={value => {
                feeder.count = parseFloat(value.count);
                feeder.size = parseFloat(value.size);
                this.setState({ feeder: feeder });
              }}
            />
          </td>
          <td className="align-middle">
            <PointEdit
              head={head}
              point={feeder.point}
              onChange={value => {
                feeder.point = value;
                this.setState({ feeder: feeder });
              }}
            />
          </td>
          <td className="align-middle">
            <MoveHeadButtons head={head} point={feeder.origin} />
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
                      this.props.onUpdate(feeder, () => {
                        this.setState({ updating: false });
                      });
                    }}
                  />
                  <IconButton
                    title="Discard changes"
                    icon="times-circle"
                    onClick={e => {
                      this.setState({ feeder: this.props.feeder });
                      this.props.onDiscard();
                    }}
                  />
                </React.Fragment>
              )}
            </div>
          </td>
        </tr>
        <tr>
          <td className="align-right">
            <span className="font-weight-bold">Code:</span>
          </td>
          <td colSpan="4" className="align-middle">
            <CodeEditor
              height="160px"
              code={feeder.code}
              onChange={code => (feeder.code = code)}
            />
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default FeederEditRow;

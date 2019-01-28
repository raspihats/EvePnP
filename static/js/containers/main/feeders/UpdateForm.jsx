import React from "react";
import InputFieldFormGroup from "./InputFieldFormGroup";
import InputSelectFormGroup from "./InputSelectFromGroup";
import ComponentFormGroup from "./ComponentFormGroup";
import PointFormGroup from "./PointFormGroup";
import CodeEditorFormGroup from "./CodeEditorFormGroup";

class UpdateFrom extends React.Component {
  state = {};
  code = ""; // code change will not trigger render

  componentWillMount() {
    this.setState({ feeder: { ...this.props.feeder } });
    this.code = this.props.feeder.code;
  }

  render() {
    return (
      <React.Fragment>
        <hr />
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <div className="form-row">
                <div className="form-group col-md-6 mb-1">
                  <InputFieldFormGroup
                    label="ID:"
                    value={this.state.feeder.id}
                    onChange={value => {
                      let feeder = this.state.feeder;
                      feeder.id = value;
                      this.setState({ feeder: feeder });
                    }}
                  />
                </div>
                <div className="form-group col-md-6 mb-1">
                  <InputSelectFormGroup
                    label="Type:"
                    options={["StripFeeder"]}
                    value={this.state.feeder.type}
                    onChange={e => {}}
                  />
                </div>
                <div className="form-group col-md-6 mb-1">
                  <InputFieldFormGroup
                    type="number"
                    label="Size:"
                    value={this.state.feeder.size}
                    onChange={value => {
                      let feeder = this.state.feeder;
                      feeder.size = parseInt(value);
                      this.setState({ feeder: feeder });
                    }}
                  />
                </div>
                <div className="form-group col-md-6 mb-1">
                  <InputFieldFormGroup
                    type="number"
                    label="Count:"
                    value={this.state.feeder.count}
                    onChange={value => {
                      let feeder = this.state.feeder;
                      feeder.count = parseInt(value);
                      this.setState({ feeder: feeder });
                    }}
                  />
                </div>
                <div className="col-md-12">
                  <PointFormGroup
                    point={this.state.feeder.point}
                    onChange={(axis, value) => {
                      let feeder = this.state.feeder;
                      feeder.point[axis] = value;
                      this.setState({ feeder: feeder });
                    }}
                  />
                </div>
                <div className="col-md-12">
                  <ComponentFormGroup
                    component={this.state.feeder.component}
                    onChange={(key, value) => {
                      let feeder = this.state.feeder;
                      feeder.component[key] = value;
                      this.setState({ feeder: feeder });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="form-group col-md-6">
              <CodeEditorFormGroup
                code={this.code}
                onChange={code => (this.code = code)}
              />
            </div>
            <div className="form-group col-md-12">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={e => {
                  let feeder = this.state.feeder;
                  feeder.code = this.code;
                  this.props.onUpdate(feeder);
                }}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default UpdateFrom;

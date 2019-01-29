import React from "react";
import InputField from "../../../components/InputField";
import OffsetButtons from "../OffsetButtons";
import api from "../../../api";

class PointFormGroup extends React.Component {
  state = {};

  calcPosition(offset) {
    api.axis.positions.list(data => {
      data.forEach(axis => {
        if (this.props.point.hasOwnProperty(axis.id)) {
          let position = axis.position;
          if (offset.hasOwnProperty(axis.id)) {
            position += offset[axis.id];
          }
          this.props.onChange(axis.id, position);
        }
      });
    });
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor="code">Point:</label>
        <div className="form-row">
          <div className="form-group col-6 mb-1">
            {Object.keys(this.props.point)
              .sort()
              .map(axis => (
                <InputField
                  type="number"
                  key={axis}
                  prepend={axis + ":"}
                  value={this.props.point[axis]}
                  onChange={e => {
                    this.props.onChange(axis, parseFloat(e.target.value));
                  }}
                />
              ))}
          </div>
          <div className="form-group col-6 mb-1">
            <OffsetButtons
              title="Capture position"
              heads={this.props.heads}
              onClick={offset => this.calcPosition(offset)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PointFormGroup;

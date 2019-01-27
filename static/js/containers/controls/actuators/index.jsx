import React from "react";
import ToggleActuator from "./ToggleActuator";
import api from "../../../api";

class Actuators extends React.Component {
  state = { actuators: [] };

  setActuatorValue(id, value) {
    api.actuators.updateValue(id, value, data => {
      let actuators = this.state.actuators.map(actuator => {
        if (actuator.id == data.id) {
          actuator.value = data.value;
        }
        return actuator;
      });
      this.setState({ actuators: actuators });
    });
  }

  updateActuatorsValues() {
    api.actuators.getValuesList(data => {
      this.setState({ actuators: data });
    });
  }

  componentDidMount() {
    this.updateActuatorsValues();
    // setInterval(() => {
    //   this.updateActuatorsValues();
    // }, 100);
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <div className="p-2">
          {this.state.actuators.map(actuator => {
            return (
              <ToggleActuator
                key={actuator.id}
                label={actuator.id}
                value={actuator.value}
                onChange={value => {
                  this.setActuatorValue(actuator.id, value);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Actuators;

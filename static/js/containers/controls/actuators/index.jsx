import React from "react";
import Switch from "../../../components/Switch";
import api from "../../../api";

const Actuator = props => {
  return (
    <Switch label={props.id} checked={props.value} onChange={props.onChange} />
  );
};

class Actuators extends React.Component {
  state = { actuators: [] };

  setActuatorValue(actuator, value) {
    let clone = { ...actuator };
    clone.value = value;

    api
      .put("actuators/values/" + actuator.id, clone)
      .then(response => {
        let actuators = this.state.actuators.map(actuator => {
          if (actuator.id == response.data.id) {
            actuator.value = response.data.value;
          }
          return actuator;
        });
        this.setState({ actuators: actuators });
      })
      .catch(error => {
        api.errorHandler("Actuators error!", error);
      });
  }

  updateActuatorsValues() {
    api
      .get("actuators/values")
      .then(response => {
        this.setState({ actuators: response.data });
      })
      .catch(error => {
        api.errorHandler("Actuators error!", error);
      });
  }

  componentDidMount() {
    this.updateActuatorsValues();
    // setInterval(() => {
    //   this.updateActuatorsValues();
    // }, 2000);
  }

  render() {
    // this.updateActuatorsValues();
    return (
      <div className="d-flex flex-column">
        <div className="p-2">
          {this.state.actuators.map(actuator => {
            let props = {
              ...actuator,
              key: actuator.id,
              onChange: value => {
                this.setActuatorValue(actuator, value);
              }
            };
            return <Actuator {...props} />;
          })}
        </div>
      </div>
    );
  }
}

export default Actuators;

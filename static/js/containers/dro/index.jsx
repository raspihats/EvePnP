import React from "react";
import { InputGroup } from "../../components/InputGroup";
import AxisPosition from "./AxisPosition";
import api from "../../api";

class Dro extends React.Component {
  state = { axis: [] };

  updateAxisPositions() {
    api
      .get("axis/positions")
      .then(response => {
        // build Nozzle list, add 'head' and 'selected' attributes
        this.setState({ axis: response.data });
      })
      .catch(error => {
        // api.errorHandler("Axis positions error!", error);
      });
  }

  componentDidMount() {
    this.updateAxisPositions();
    setInterval(() => {
      this.updateAxisPositions();
    }, 100);
  }

  render() {
    return (
      <form className="form-inline ml-auto mr-3">
        <InputGroup small>
          {this.state.axis.map(axis => (
            <AxisPosition
              key={axis.id}
              axis={axis.id}
              position={axis.position}
            />
          ))}
        </InputGroup>
      </form>
    );
  }
}

export default Dro;

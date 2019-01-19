import React from "react";
import Select from "../../../components/Select";
import JogDial from "./JogDial";
import api from "../../../api";

class Jog extends React.Component {
  state = { nozzles: [] };

  getNozzlesDescription() {
    let nozzles = [];
    this.state.nozzles.forEach(nozzle => {
      nozzles.push(nozzle.id + " (Head: " + nozzle.headId + ")");
    });
    return nozzles;
  }

  getSelectedNozzle() {
    let n = null;
    this.state.nozzles.forEach(nozzle => {
      if (nozzle.selected) {
        n = nozzle;
      }
    });
    return n;
  }

  onSelectNozzle(nozzleDescription) {
    let nozzles = this.state.nozzles.map(nozzle => {
      if (
        nozzleDescription.search(nozzle.headId) !== -1 &&
        nozzleDescription.search(nozzle.id) !== -1
      ) {
        nozzle.selected = true;
      } else {
        nozzle.selected = false;
      }
      return nozzle;
    });
    this.setState({ nozzles: nozzles });
  }

  onHome() {
    api
      .put(
        "axis/home",
        [..."xyz"].map(c => {
          return { id: c };
        })
      )
      .catch(error => {
        api.errorHandler("Homing error!", error);
      });
  }

  onPark(axis) {
    api
      .put(
        "axis/park",
        [...axis].map(c => {
          return { id: c };
        })
      )
      .catch(error => {
        api.errorHandler("Parking error!", error);
      });
  }

  onJog(axis, step) {
    api.put("axis/park", { id: axis, step: step }).catch(error => {
      api.errorHandler("Parking error!", error);
    });
  }

  componentDidMount() {
    api
      .get("heads")
      .then(response => {
        // build Nozzle list, add 'head' and 'selected' attributes
        let nozzles = [];
        response.data.forEach(head => {
          head.nozzles.forEach(nozzle => {
            nozzles.push({ ...nozzle, headId: head.id, selected: false });
          });
        });
        this.setState({ nozzles: nozzles });
      })
      .catch(error => {
        api.errorHandler("Heads error!", error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Select
          small
          prepend="Nozzle:"
          options={this.getNozzlesDescription()}
          onChange={value => {
            this.onSelectNozzle(value);
          }}
        />
        <JogDial
          onHome={this.onHome}
          onPark={this.onPark}
          onJog={this.onJog}
          nozzle={this.getSelectedNozzle()}
        />
      </React.Fragment>
    );
  }
}

export default Jog;

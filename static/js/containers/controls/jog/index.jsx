import React from "react";
import Select from "../../../components/Select";
import JogDial from "./JogDial";
import api from "../../../api";

class Jog extends React.Component {
  state = { nozzleCarriages: [], selectedId: null };

  getNozzleCarriagesIds() {
    let nozzleCarriageIds = [];
    this.state.nozzleCarriages.forEach(nozzleCarriage => {
      nozzleCarriageIds.push(nozzleCarriage.id);
    });
    return nozzleCarriageIds;
  }

  getSelectedNozzleCarriage() {
    let nozzleCarriage = null;
    this.state.nozzleCarriages.forEach(element => {
      if (element.id === this.state.selectedId) {
        nozzleCarriage = element;
      }
    });
    return nozzleCarriage;
  }

  componentDidMount() {
    api.nozzleCarriages.list(data => {
      this.setState({ nozzleCarriages: data, selectedId: data[0].id });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Select
          small
          prepend="Nozzle Carriage:"
          options={this.getNozzleCarriagesIds()}
          onChange={value => {
            this.setState({ selectedId: value });
          }}
        />
        <JogDial
          onHome={api.axis.home}
          onPark={api.axis.park}
          onJog={api.axis.jog}
          nozzleCarriage={this.getSelectedNozzleCarriage()}
        />
      </React.Fragment>
    );
  }
}

export default Jog;

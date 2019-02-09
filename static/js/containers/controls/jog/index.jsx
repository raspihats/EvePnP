import React from "react";
import SelectInputGroup from "../../../components/SelectInputGroup";
import JogDial from "./JogDial";
import api from "../../../api";

class Jog extends React.Component {
  state = { placementHeads: [], selected: "" };

  onPark(axis) {
    let pHeadId = this.state.selected;
    api.head.update(
      "p_heads/" + pHeadId + "/park",
      [...axis].map(c => {
        return { id: c };
      }),
      () => {},
      10000
    );
  }

  onJog(axis, step) {
    let pHeadId = this.state.selected;
    api.head.update(
      "p_heads/" + pHeadId + "/jog",
      { id: axis, step: step },
      () => {},
      10000
    );
  }

  componentDidMount() {
    api.head.list(head => {
      this.setState({
        placementHeads: head.placement_heads,
        selected: head.placement_heads[0].id
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <SelectInputGroup
          small
          prepend="Placement Head:"
          options={this.state.placementHeads.map(p => p.id)}
          value={this.state.selected}
          onChange={value => {
            this.setState({ selected: value });
          }}
        />
        <JogDial
          onHome={api.axis.positions.home}
          onPark={axis => this.onPark(axis)}
          onJog={(axis, step) => this.onJog(axis, step)}
        />
      </React.Fragment>
    );
  }
}

export default Jog;

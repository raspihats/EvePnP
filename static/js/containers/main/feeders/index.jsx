import React from "react";
import api from "../../../api";
import IconButton from "../IconButton";
import FeederDisplayRow from "./FeederDisplayRow";
import FeederEditRow from "./FeederEditRow";

class Feeders extends React.Component {
  state = { head: null, feeders: [], editIds: [] };

  getHead() {
    api.head.get("", data => this.setState({ head: data }));
  }

  listFeeders() {
    api.feeders.list(data => this.setState({ feeders: data }));
  }

  onReloadAllFeeders() {
    let feeders = [...this.state.feeders];
    feeders.forEach((feeder, index) => {
      feeder.count = feeder.size;
      api.feeders.update(feeder.id, feeder, () => {
        if (index === feeders.length - 1) {
          this.listFeeders();
        }
      });
    });
  }

  onUpdateFeeder(id, feeder, callback) {
    api.feeders.update(id, feeder, () => {
      callback();
      this.listFeeders();
    });
  }

  addEditId(id) {
    let editIds = [...this.state.editIds];
    if (editIds.indexOf(id) === -1) {
      editIds.push(id);
    }
    this.setState({ editIds: editIds });
  }

  removeEditId(id) {
    let editIds = [...this.state.editIds];
    let index = editIds.indexOf(id);
    if (index !== -1) {
      editIds.splice(index, 1);
    }
    this.setState({ editIds: editIds });
  }

  componentDidMount() {
    this.getHead();
    this.listFeeders();
  }

  render() {
    return (
      <React.Fragment>
        <IconButton title="Add new feeder" icon="plus" onClick={e => {}} />
        <IconButton
          title="Reload all feeders"
          icon="redo"
          onClick={e => this.onReloadAllFeeders()}
        />
        <table className="table text-info">
          <thead>
            <tr className="bg-light">
              <th scope="col">ID</th>
              <th scope="col">Type</th>
              <th scope="col">Component</th>
              <th scope="col">Count / Size</th>
              <th scope="col">Point</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="border-bottom">
            {this.state.feeders.map(feeder =>
              this.state.editIds.indexOf(feeder.id) === -1 ? (
                <FeederDisplayRow
                  key={feeder.id}
                  head={this.state.head}
                  feeder={feeder}
                  onEdit={() => this.addEditId(feeder.id)}
                  onReload={(updatedFeeder, callback) => {
                    this.onUpdateFeeder(feeder.id, updatedFeeder, () => {
                      callback();
                    });
                  }}
                />
              ) : (
                <FeederEditRow
                  key={feeder.id}
                  head={this.state.head}
                  types={["StripFeeder"]}
                  feeder={feeder}
                  onUpdate={(updatedFeeder, callback) => {
                    this.onUpdateFeeder(feeder.id, updatedFeeder, () => {
                      callback();
                      this.removeEditId(feeder.id);
                    });
                  }}
                  onDiscard={() => this.removeEditId(feeder.id)}
                />
              )
            )}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Feeders;

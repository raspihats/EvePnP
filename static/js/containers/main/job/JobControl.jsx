import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectInputGroup from "../../../components/SelectInputGroup";

const Button = props => {
  return (
    <button
      className="btn btn-outline-secondary"
      type="button"
      title={props.title}
      onClick={e => {
        // e.preventDefault();
        // e.target.blur();
        props.onClick();
      }}
    >
      <FontAwesomeIcon icon={props.icon} />
    </button>
  );
};

const uploadString = "Upload ...";

class JobControl extends React.Component {
  state = { option: uploadString };

  getButtons() {
    if (this.state.option == uploadString) {
      return (
        <Button
          title="Upload job"
          icon="upload"
          onClick={() => this.props.onUpload()}
        />
      );
    } else {
      if (this.props.running) {
        return (
          <React.Fragment>
            <Button
              title="Pause job"
              icon="pause"
              onClick={() => this.props.onPause()}
            />
            <Button title="Stop job" icon="stop" onClick={this.props.onStop} />
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Button
              title="Start job"
              icon="play"
              onClick={() => this.props.onStart()}
            />
            <Button
              title="Delete job"
              icon="trash"
              onClick={() => this.props.onDelete()}
            />
          </React.Fragment>
        );
      }
    }
  }

  render() {
    return (
      <SelectInputGroup
        onChange={value => {
          if (value === uploadString) {
            this.props.onSelect(null);
          } else {
            this.props.onSelect(value);
          }
          this.setState({ option: value });
        }}
        prepend="Job:"
        options={[uploadString].concat(this.props.jobs)}
        value={this.props.running}
        disabled={this.props.running ? true : false}
        append={this.getButtons()}
      />
    );
  }
}

export default JobControl;

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
  getButtons() {
    if (!this.props.selectedJobId) {
      return (
        <Button
          title="Upload job"
          icon="upload"
          onClick={() => this.props.onUpload()}
        />
      );
    } else {
      return (
        <React.Fragment>
          {(this.props.runningState === "idle" ||
            this.props.runningState === "pause") && (
            <Button
              title="Start job"
              icon="play"
              onClick={() => this.props.onStart()}
            />
          )}
          {this.props.runningState === "run" && (
            <Button
              title="Pause job"
              icon="pause"
              onClick={() => this.props.onPause()}
            />
          )}
          {(this.props.runningState === "run" ||
            this.props.runningState === "pause") && (
            <Button title="Stop job" icon="stop" onClick={this.props.onStop} />
          )}
          {this.props.runningState === "idle" && (
            <Button
              title="Delete job"
              icon="trash"
              onClick={() => this.props.onDelete()}
            />
          )}
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <SelectInputGroup
        prepend="Job:"
        options={[uploadString].concat(this.props.jobs)}
        value={
          this.props.selectedJobId ? this.props.selectedJobId : uploadString
        }
        disabled={
          this.props.runningState === "run" ||
          this.props.runningState === "pause"
        }
        append={this.getButtons()}
        onChange={value => {
          if (value === uploadString) {
            this.props.onSelect(null);
          } else {
            this.props.onSelect(value);
          }
          this.setState({ option: value });
        }}
      />
    );
  }
}

export default JobControl;

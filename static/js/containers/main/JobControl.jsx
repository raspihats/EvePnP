import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "../../components/Select";

const Button = props => {
  return (
    <button
      className="btn btn-outline-secondary"
      type="button"
      title={props.title}
      onClick={e => {
        // e.preventDefault();
        // e.target.blur();
        props.onClick(e);
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
          onClick={this.props.onUpload}
        />
      );
    } else {
      if (this.state.running) {
        return (
          <React.Fragment>
            <Button
              title="Pause job"
              icon="pause"
              onClick={e => console.log(e)}
            />
            <Button
              title="Stop job"
              icon="stop"
              onClick={e => console.log(e)}
            />
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Button
              title="Start job"
              icon="play"
              onClick={e => console.log(e)}
            />
            <Button
              title="Delete job"
              icon="trash"
              onClick={e => console.log(e)}
            />
          </React.Fragment>
        );
      }
    }
  }

  render() {
    return (
      <Select
        onChange={e => {
          e.target.blur();

          let option = e.target.value == uploadString ? null : e.target.value;
          this.props.onSelect(option);

          this.setState({ option: e.target.value });
        }}
        prepend="Job:"
        options={[uploadString].concat(this.props.jobs)}
        append={this.getButtons()}
      />
    );
  }
}

export default JobControl;

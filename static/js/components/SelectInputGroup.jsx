import React from "react";
import {
  InputGroup,
  InputGroupPrepend,
  InputGroupAppend,
  InputGroupText
} from "./InputGroup";
import { isString, isValid } from "../utils";

class SelectInputGroup extends React.Component {
  state = { value: "" };
  pleaseSelect = "Please select...";

  componentDidMount() {
    if (isValid(this.props.value) && isValid(this.props.options)) {
      if (this.props.options.indexOf(this.props.value) === -1) {
        this.setState({ value: this.pleaseSelect });
      } else {
        this.setState({ value: this.props.value });
      }
    } else if (isValid(this.props.options)) {
      let value = this.props.options[0];
      this.setState({ value: value });
      this.props.onChange(value);
    }
  }

  render() {
    let options = this.props.options;
    if (this.state.value === this.pleaseSelect) {
      options = [this.pleaseSelect].concat(this.props.options);
    }

    let options_elements = options.map(option => (
      <option key={option}>{option}</option>
    ));

    return (
      <InputGroup small={this.props.small}>
        {isValid(this.props.prepend) && (
          <InputGroupPrepend>
            {isString(this.props.prepend) ? (
              <InputGroupText>{this.props.prepend}</InputGroupText>
            ) : (
              this.props.prepend
            )}
          </InputGroupPrepend>
        )}
        <select
          className="custom-select"
          id={this.props.id}
          onChange={e => {
            e.target.blur();
            this.setState({ value: e.target.value });
            this.props.onChange(e.target.value);
          }}
          value={this.state.value}
        >
          {options_elements}
        </select>
        {isValid(this.props.append) && (
          <InputGroupAppend>
            {isString(this.props.append) ? (
              <InputGroupText>{this.props.append}</InputGroupText>
            ) : (
              this.props.append
            )}
          </InputGroupAppend>
        )}
      </InputGroup>
    );
  }
}

export default SelectInputGroup;
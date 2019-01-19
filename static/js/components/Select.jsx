import React from "react";
import {
  InputGroup,
  InputGroupPrepend,
  InputGroupAppend,
  InputGroupText
} from "./InputGroup";

class Select extends React.Component {
  state = { selectedValue: null };

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.options !== newProps.options) {
      if (
        this.state.selectedValue === null ||
        newProps.options.indexOf(this.state.selectedValue) === -1
      ) {
        let selectedValue = newProps.options[0];
        this.setState({ selectedValue: selectedValue });
        // console.log("firing for: " + selectedValue);
        this.props.onChange(selectedValue);
      }
    }
  }

  render() {
    const options = this.props.options.map(option => (
      <option key={option}>{option}</option>
    ));

    return (
      <InputGroup {...this.props}>
        <InputGroupPrepend>
          {typeof this.props.prepend == "string" ||
          this.props.prepend instanceof String ? (
            <InputGroupText>{this.props.prepend}</InputGroupText>
          ) : (
            this.props.prepend
          )}
        </InputGroupPrepend>
        <select
          className="custom-select"
          id={this.props.id}
          onChange={e => {
            e.target.blur();
            this.setState({ selectedValue: e.target.value });
            this.props.onChange(e.target.value);
          }}
          value={this.selectedValue}
        >
          {options}
        </select>
        <InputGroupAppend>
          {typeof this.props.append == "string" ||
          this.props.append instanceof String ? (
            <InputGroupText>{this.props.append}</InputGroupText>
          ) : (
            this.props.append
          )}
        </InputGroupAppend>
      </InputGroup>
    );
  }
}

export default Select;

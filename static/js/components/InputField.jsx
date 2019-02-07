import React from "react";
import {
  InputGroup,
  InputGroupPrepend,
  InputGroupAppend,
  InputGroupText
} from "../components/InputGroup";
import { isString, isValid } from "../utils";

class InputInputGroup extends React.Component {
  state = { value: "" };

  componentDidMount() {
    if (isValid(this.props.value)) {
      this.setState({ value: this.props.value });
    }
  }

  render() {
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
        <input
          type={this.props.type ? this.props.type : "text"}
          className="form-control"
          id={this.props.id}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={e => {
            this.setState({ value: e.target.value });
            this.props.onChange(e.target.value);
          }}
          maxLength={this.props.size}
          size={this.props.size}
          list={
            isValid(this.props.id) &&
            isValid(this.props.options) &&
            "list" + this.props.id
          }
        />
        {isValid(this.props.options) && (
          <datalist id={isValid(this.props.id) && "list" + this.props.id}>
            {this.props.options.map((element, index) => {
              return <option key={index}>{element}</option>;
            })}
          </datalist>
        )}
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

// const InputField = props => {
//   let options = null;
//   if (props.options) {
//     options = props.options.map((element, index) => {
//       return <option key={index}>{element}</option>;
//     });
//   }

//   return (
//     <InputGroup small={props.small}>
//       {props.prepend && (
//         <InputGroupPrepend>
//           {isString(props.prepend) ? (
//             <InputGroupText>{props.prepend}</InputGroupText>
//           ) : (
//             props.prepend
//           )}
//         </InputGroupPrepend>
//       )}
//       <input
//         type={props.type ? props.type : "text"}
//         className="form-control"
//         id={props.id}
//         placeholder={props.placeholder}
//         value={props.value}
//         onChange={props.onChange}
//         maxLength={props.maxLength}
//         list={props.id && props.options && "list" + props.id}
//       />
//       {props.options && (
//         <datalist id={props.id && "list" + props.id}>{options}</datalist>
//       )}
//       {props.append && (
//         <InputGroupAppend>
//           {isString(props.append) ? (
//             <InputGroupText>{props.append}</InputGroupText>
//           ) : (
//             props.append
//           )}
//         </InputGroupAppend>
//       )}
//     </InputGroup>
//   );
// };

export default InputInputGroup;

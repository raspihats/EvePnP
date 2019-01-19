import React from "react";

// class Switch extends React.Component {
//   state = { checked: false };

//   componentWillMount() {
//     console.log("Switch componentWillMount: " + this.props.checked);
//     this.setState({ checked: this.props.checked });
//   }

//   render() {
//     let id = this.props.id ? this.props.id : this.props.label.replace(" ", "");
//     console.log("Switch render: " + this.state.checked);
//     return (
//       <div className="custom-control custom-switch">
//         <input
//           type="checkbox"
//           className="custom-control-input"
//           id={id}
//           checked={this.state.checked}
//           onChange={e => {
//             this.setState({ checked: e.target.checked });
//             this.props.onChange(e.target.checked);
//           }}
//         />
//         <label className="custom-control-label" htmlFor={id}>
//           {this.props.label}
//         </label>
//       </div>
//     );
//   }
// }

const Switch = props => {
  let id = props.id ? props.id : props.label.replace(" ", "");
  return (
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className="custom-control-input"
        id={id}
        checked={props.checked}
        onChange={e => {
          props.onChange(Number(e.target.checked));
        }}
      />
      <label className="custom-control-label" htmlFor={id}>
        {props.label}
      </label>
    </div>
  );
};

export default Switch;

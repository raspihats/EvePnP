import React from "react";
import InputInputGroup from "../../components/InputInputGroup";
import CaptureHeadButtons from "./CaptureHeadButtons";

const PointEdit = props => {
  return (
    <React.Fragment>
      <div className={props.inline && "form-inline"}>
        {Object.keys(props.point)
          .sort()
          .map(key => (
            <InputInputGroup
              key={key}
              small
              type="number"
              range={{ min: 0.0, max: 999.999, step: 0.001 }}
              prepend={key}
              value={props.point[key]}
              onChange={value => {
                let point = { ...props.point };
                point[key] = parseFloat(value);
                props.onChange(point);
              }}
            />
          ))}
        <CaptureHeadButtons
          head={props.head}
          onCapture={capturePoint => {
            let point = { ...props.point };
            Object.keys(point).forEach(axis => {
              if (capturePoint.hasOwnProperty(axis)) {
                point[axis] = capturePoint[axis];
              }
            });
            props.onChange(point);
          }}
        />
      </div>
    </React.Fragment>
  );
};

// class PointEdit extends React.Component {
//   state = { point: this.props.point };

//   render() {
//     let { head } = this.props;
//     let point = { ...this.state.point };
//     return (
//       <React.Fragment>
//         <div className="form-inline">
//           {Object.keys(point).map(key => (
//             <InputInputGroup
//               key={key}
//               small
//               type="number"
//               range={[0.0, 999.99]}
//               prepend={key}
//               value={point[key]}
//               onChange={value => {
//                 point[key] = value;
//                 this.setState({ point: point });
//               }}
//             />
//           ))}
//           <CaptureHeadButtons
//             head={head}
//             onCapture={capturePoint => {
//               Object.keys(point).forEach(axis => {
//                 if (capturePoint.hasOwnProperty(axis)) {
//                   point[axis] = capturePoint[axis];
//                 }
//               });
//               this.setState({ point: point });
//             }}
//           />
//         </div>
//       </React.Fragment>
//     );
//   }
// }

export default PointEdit;

import React from "react";
import InputText from "../../../components/InputText";

import AceEditor from "react-ace";
import "brace/mode/python";
import "brace/theme/monokai";
import "brace/ext/language_tools";

const InputGroupText = props => {
  let targetId = "inputText" + props.label;
  return (
    <div className="form-group">
      <label htmlFor={targetId}>{props.label}</label>
      <input
        type="text"
        className="form-control"
        id={targetId}
        // placeholder="1234 Main St"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

const InputTextFormGroup = props => {
  let targetId = "inputText" + props.label;
  return (
    <div className="form-group">
      <label htmlFor={targetId}>{props.label}</label>
      <input
        type="text"
        className="form-control"
        id={targetId}
        // placeholder="1234 Main St"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

const InputSelectFormGroup = props => {
  let targetId = "inputSelect" + props.label;
  return (
    <div className="form-group">
      <label htmlFor={targetId}>{props.label}</label>
      <select
        className="form-control"
        id={targetId}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

// const Editor = props => {
//   let targetId = "editor" + props.label;
//   return (
//     <div className="form-group">
//       <label htmlFor={targetId}>{props.label}</label>
//       <div id={targetId}>
//         <AceEditor
//           mode="python"
//           theme="monokai"
//           name="blah2"
//           onLoad={this.onLoad}
//           onChange={this.onChange}
//           fontSize={14}
//           showPrintMargin={true}
//           showGutter={true}
//           highlightActiveLine={true}
//           height="100%"
//           value={`def fnc():
//     pass`}
//           setOptions={{
//             enableBasicAutocompletion: false,
//             enableLiveAutocompletion: false,
//             enableSnippets: false,
//             showLineNumbers: true,
//             tabSize: 4
//           }}
//           editorProps={{
//             $blockScrolling: Infinity
//           }}
//         />
//       </div>
//     </div>
//   );
// };

class Edit extends React.Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <hr />
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <div className="form-row">
                <div className="form-group col-md-6 mb-1">
                  <InputTextFormGroup
                    label="ID:"
                    value={this.props.id}
                    onChange={() => {}}
                  />
                </div>
                <div className="form-group col-md-6 mb-1">
                  <InputSelectFormGroup
                    label="Type:"
                    options={["StripFeeder"]}
                    onChange={() => {}}
                  />
                </div>
                <div className="form-group col-md-6 mb-1">
                  <InputTextFormGroup
                    label="Size:"
                    value={this.props.size}
                    onChange={() => {}}
                  />
                </div>
                <div className="form-group col-md-6 mb-1">
                  <InputTextFormGroup
                    label="Count:"
                    value={this.props.count}
                    onChange={() => {}}
                  />
                </div>

                <div className="form-group col-md-12 mb-1">
                  <label htmlFor="code">Point:</label>
                  <div className="form-row">
                    <div className="form-group col-md-3 mb-1">
                      <InputText
                        prepend="X:"
                        value="0.000"
                        onChange={() => {}}
                      />
                    </div>
                    <div className="form-group col-md-3 mb-1">
                      <InputText
                        prepend="Y:"
                        value="0.000"
                        onChange={() => {}}
                      />
                    </div>
                    <div className="form-group col-md-3 mb-1">
                      <InputText
                        prepend="Z:"
                        value="0.000"
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="form-group">
                <label htmlFor="code">Code:</label>

                <AceEditor
                  mode="python"
                  theme="monokai"
                  name="code"
                  onLoad={this.onLoad}
                  onChange={this.onChange}
                  fontSize={14}
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  height="320px"
                  value={`def fnc():
    pass`}
                  setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 4
                  }}
                  editorProps={{
                    $blockScrolling: Infinity
                  }}
                />
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-primary btn-lg btn-block">
            Update
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Edit;

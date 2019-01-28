import React from "react";
import AceEditor from "react-ace";
import "brace/mode/python";
import "brace/theme/monokai";
import "brace/ext/language_tools";

class CodeEditorFormGroup extends React.Component {
  state = {};

  // onLoad() {}

  // onChange(value) {
  //   console.log(value);
  // }

  render() {
    return (
      <div className="form-group">
        <label htmlFor="code">Code:</label>

        <AceEditor
          mode="python"
          theme="monokai"
          name="code"
          // onLoad={this.onLoad}
          onChange={this.props.onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          height="320px"
          value={this.props.code}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            useSoftTabs: true,
            tabSize: 4
          }}
          editorProps={{
            $blockScrolling: Infinity
          }}
        />
      </div>
    );
  }
}

export default CodeEditorFormGroup;

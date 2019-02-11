import React from "react";
import AceEditor from "react-ace";
import "brace/mode/python";
import "brace/theme/monokai";
import "brace/ext/language_tools";

const CodeEditor = props => {
  return (
    <AceEditor
      mode="python"
      theme="monokai"
      name="code"
      // onLoad={this.onLoad}
      onChange={props.onChange}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      height={props.height}
      value={props.code}
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
  );
};

export default CodeEditor;

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/js/dist/tab";
import "bootstrap/js/dist/collapse";
import "bootstrap/dist/css/bootstrap.min.css";

// import hljs from "highlight.js/lib/highlight";
// import python from "highlight.js/lib/languages/python";

import { library } from "@fortawesome/fontawesome-svg-core";
// following import uses babel-transform-imports to reduce size
import {
  faUpload,
  faPlay,
  faPause,
  faStop,
  faPlus,
  faTrash,
  faEdit,
  faBullseye,
  faDotCircle,
  faAngleDoubleDown,
  faAngleDoubleUp
} from "@fortawesome/free-solid-svg-icons";

library.add(faUpload);
library.add(faPlay);
library.add(faPause);
library.add(faStop);
library.add(faPlus);
library.add(faTrash);
library.add(faEdit);
library.add(faBullseye);
library.add(faDotCircle);
library.add(faAngleDoubleDown);
library.add(faAngleDoubleUp);

// hljs.registerLanguage("pthon", javascript);

ReactDOM.render(<App />, document.getElementById("container"));

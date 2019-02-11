import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/js/dist/tab";
import "bootstrap/dist/css/bootstrap.min.css";

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
  faAngleDoubleUp,
  faPenSquare,
  faSave,
  faTimesCircle,
  faSpinner,
  faRedo
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
library.add(faPenSquare);
library.add(faSave);
library.add(faTimesCircle);
library.add(faSpinner);
library.add(faPlus);
library.add(faRedo);

ReactDOM.render(<App />, document.getElementById("container"));

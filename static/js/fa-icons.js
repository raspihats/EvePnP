import { library } from "@fortawesome/fontawesome-svg-core";
// following import uses babel-transform-imports to reduce size
import {
  faPlay,
  faPause,
  faStop,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

const FontAwesomeIcons = {
  init: () => {
    library.add(faPlay);
    library.add(faPause);
    library.add(faStop);
    library.add(faPlus);
    library.add(faTrash);
  }
};

export default FontAwesomeIcons;

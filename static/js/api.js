import axios from "axios";

const baseURL = window.location.protocol + "/api/";

let api = axios.create({
  baseURL: baseURL,
  timeout: 1000
});

const errorHandler = (title, error) => {
  let message = title + "\n";
  message += JSON.stringify(error);
  // if (error.hasOwnProperty("response")) {
  //   message += "status: " + error.response.status;
  //   message += ", " + error.response.statusText + "\n";
  // }
  // message += "message: " + error.response.data.message

  alert(message);
};

const axis = {
  home: () => {
    api
      .put(
        "axis/position/home",
        [..."xyz"].map(c => {
          return { id: c };
        }),
        {
          timeout: 30000
        }
      )
      .catch(error => {
        errorHandler("Homing error!", error);
      });
  },
  park: axis => {
    api
      .put(
        "axis/position/park",
        [...axis].map(c => {
          return { id: c };
        })
      )
      .catch(error => {
        errorHandler("Parking error!", error);
      });
  },
  jog: (axis, step) => {
    api.put("axis/position/jog", { id: axis, step: step }).catch(error => {
      errorHandler("Jog error!", error);
    });
  }
};

const heads = {
  list: () => {
    api
      .get("heads")
      .then(response => {
        // build Nozzle list, add 'head' and 'selected' attributes
        let nozzles = [];
        response.data.forEach(head => {
          head.nozzles.forEach(nozzle => {
            nozzles.push({ ...nozzle, headId: head.id, selected: false });
          });
        });
        this.setState({ nozzles: nozzles });
      })
      .catch(error => {
        api.errorHandler("Heads error!", error);
      });
  }
};

api.errorHandler = errorHandler;
api.axis = axis;

export default api;

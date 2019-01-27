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
  console.log(error);
  alert(message);
};

const actuators = {
  getValuesList: callback => {
    api
      .get("actuators/values")
      .then(response => callback(response.data))
      .catch(error => {
        errorHandler("Api, actuators list values error!", error);
      });
  },
  getValue: (id, callback) => {
    api
      .get("actuators/values/" + id)
      .then(response => callback(response.data))
      .catch(error => {
        errorHandler("Api, actuators get value error!", error);
      });
  },
  updateValue: (id, value, callback) => {
    api
      .put("actuators/values/" + id, { id: id, value: value })
      .then(response => callback(response.data))
      .catch(error => {
        console.log(error);
        errorHandler("Api, actuators update value error!", error);
      });
  }
};

const axis = {
  positions: {
    list: (callback, reportError = true) => {
      api
        .get("axis/positions")
        .then(response => {
          callback(response.data);
        })
        .catch(error => {
          if (reportError) {
            api.errorHandler("Axis positions error!", error);
          }
        });
    }
  },
  home: () => {
    api
      .put(
        "axis/positions/home",
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
        "axis/positions/park",
        [...axis].map(c => {
          return { id: c };
        })
      )
      .catch(error => {
        errorHandler("Parking error!", error);
      });
  },
  jog: (axis, step) => {
    api.put("axis/positions/jog", { id: axis, step: step }).catch(error => {
      errorHandler("Jog error!", error);
    });
  }
};

const nozzleCarriages = {
  list: callback => {
    api
      .get("nozzle_carriages")
      .then(response => callback(response.data))
      .catch(error => {
        errorHandler("Api, list nozzle carriages error!", error);
      });
  },
  get: (id, callback) => {
    api
      .get("nozzle_carriages/" + id)
      .then(response => callback(response.data))
      .catch(error => {
        errorHandler("Api, get nozzle carriages error!", error);
      });
  },
  update: (id, value, callback) => {
    api
      .put("nozzle_carriages/" + id, { id: id, value: value })
      .then(response => callback(response.data))
      .catch(error => {
        errorHandler("Api, update nozzle carriages error!", error);
      });
  }
};

const heads = {
  list: callback => {
    api
      .get("heads")
      .then(response => callback(response.data))
      .catch(error => {
        api.errorHandler("Heads error!", error);
      });
  }
};

const feeders = {
  list: callback => {
    api
      .get("feeders")
      .then(response => callback(response.data))
      .catch(error => {
        errorHandler("Api, list feeders error!", error);
      });
  },
  get: (id, callback) => {
    api
      .get("feeders/" + id)
      .then(response => callback(response.data))
      .catch(error => {
        errorHandler("Api, get feeder error!", error);
      });
  },
  update: (id, feeder, callback = null) => {
    api
      .put("feeders/" + id, feeder)
      .then(response => callback && callback(response.data))
      .catch(error => {
        errorHandler("Api, update feeder error!", error);
      });
  }
};

api.errorHandler = errorHandler;
api.actuators = actuators;
api.axis = axis;
api.nozzleCarriages = nozzleCarriages;
api.heads = heads;
api.feeders = feeders;

export default api;

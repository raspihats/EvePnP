import axios from "axios";

const baseURL = window.location.protocol + "/api";

let api = axios.create({
  baseURL: baseURL,
  timeout: 1000
});

const errorHandler = (title, error) => {
  let message = title + "\n";

  if (error.hasOwnProperty("stack")) {
    message += error.stack;
  } else {
    try {
      message += JSON.stringify(error);
    } catch (err) {
      message += error;
    }
  }
  console.log(error);
  alert(message);
};

const actuators = {
  getValuesList: callback => {
    api
      .get("/actuators/values")
      .then(response => callback(response.data))
      .catch(error => {
        errorHandler("Api, actuators list values error!", error);
      });
  },
  getValue: (id, callback) => {
    api
      .get("/actuators/values/" + id)
      .then(response => callback(response.data))
      .catch(error => {
        errorHandler("Api, actuators get value error!", error);
      });
  },
  updateValue: (id, value, callback) => {
    api
      .put("/actuators/values/" + id, { id: id, value: value })
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
        .get("/axis/positions")
        .then(response => {
          callback(response.data);
        })
        .catch(error => {
          if (reportError) {
            api.errorHandler("Axis positions error!", error);
          }
        });
    },
    home: () => {
      api
        .put(
          "/axis/positions/home",
          [..."xyz"].map(c => {
            return { id: c };
          }),
          {
            timeout: 60000
          }
        )
        .catch(error => {
          errorHandler("Homing error!", error);
        });
    },
    park: axis => {
      api
        .put(
          "/axis/positions/park",
          [...axis].map(c => {
            return { id: c };
          }),
          {
            timeout: 5000
          }
        )
        .catch(error => {
          errorHandler("Parking error!", error);
        });
    },
    jog: (axis, step) => {
      api
        .put("/axis/positions/jog", { id: axis, step: step }, { timeout: 5000 })
        .catch(error => {
          errorHandler("Jog error!", error);
        });
    },
    update: positions => {
      api
        .put(
          "/axis/positions",
          Object.keys(positions).map(key => {
            return { id: key, position: positions[key] };
          }),
          { timeout: 5000 }
        )
        .catch(error => {
          errorHandler("Jog error!", error);
        });
    }
  }
};

class ApiEndpoint {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  list(callback) {
    api
      .get(this.endpoint)
      .then(response => callback(response.data))
      .catch(error => {
        errorHandler("Api error, get " + this.endpoint, error);
      });
  }

  get(id, callback, reportError = true) {
    api
      .get(this.endpoint + id)
      .then(response => callback(response.data))
      .catch(error => {
        if (reportError) {
          errorHandler("Api error, get " + this.endpoint, error);
        }
      });
  }

  update(id, data, callback = null, timeout = 1000) {
    api
      .put(this.endpoint + id, data, { timeout: timeout })
      .then(response => callback && callback(response.data))
      .catch(error => {
        errorHandler("Api error, update " + this.endpoint, error);
      });
  }
}

api.errorHandler = errorHandler;
api.actuators = actuators;
api.axis = axis;
api.head = new ApiEndpoint("/head/");
api.feeders = new ApiEndpoint("/feeders/");
api.jobs = new ApiEndpoint("/jobs/");
api.jobRunner = new ApiEndpoint("/job_runner/");
api.packages = new ApiEndpoint("/packages/");

export default api;

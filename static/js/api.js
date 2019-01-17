import axios from "axios";

const baseURL = window.location.href + "/api";

const api = {
  jobs: axios.create({
    baseURL: baseURL + "/jobs"
  })
};

export default api;

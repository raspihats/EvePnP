import axios from "axios";

const baseURL = window.location.href + "api/";

let api = axios.create({
  baseURL: baseURL,
  timeout: 1000
});

api.errorHandler = (title, error) => {
  // console.log(error.response.data.errors);
  // console.log(error.response.status);
  // console.log(error.response.statusText);
  alert(
    title +
      "\n" +
      "status: " +
      error.response.status +
      ", " +
      error.response.statusText +
      "\n" +
      "message: " +
      error.response.data.message
  );
};

export default api;

import axios from "axios";

export default axios.create({
  baseURL: "http://jsonplaceholder.typicode.com/"
});

// const Api = {
//   job: {
//     list: ["job1", "j0b2", "DI16ac I2C-HAT"]
//   }
// };

// export default Api;

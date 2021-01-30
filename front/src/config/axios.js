import axios from "axios";

let api =
  window.location.host == "localhost:3000"
    ? "http://localhost:5000"
    : "https://encontralo.org/";

const axiosClient = axios.create({
  baseURL: api,
});

export default axiosClient;

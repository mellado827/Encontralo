import axios from "axios";

let api =
  window.location.host == "localhost:3000"
    ? "http://localhost:5000/api"
    : "https://encontralo.org/api";

const axiosClient = axios.create({
  baseURL: api,
});

export default axiosClient;

import axios from 'axios';

let api = window.location.host == 'localhost:8080' ? 'http://localhost:5000' : 'https://encontralo.herokuapp.com/';

const axiosClient = axios.create({
    baseURL: api
});

export default axiosClient
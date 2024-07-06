import axios from "axios";
// Where you would set stuff like your 'Authorization' header, etc ...
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

const client = axios.create({
  // .. where we make our configurations
  baseURL: "http://127.0.0.1:8000",
  //baseURL: 'https://api.example.com' // for production
});

export default client;

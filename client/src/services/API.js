import axios from "axios";
// process.loadEnvFile();
// const REACT_APP_BASEURL = "http://localhost:8080/api/v1"

const API = axios.create({ baseURL: "http://localhost:8080/api/v1" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")} `;
  }
  return req;
});

export default API;

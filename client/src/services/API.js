import axios from "axios";

// const URL = "https://donate-blood-back-end.onrender.com/api/v1";
const BASE_URL = import.meta.env.MEDICARE_APP_BASE_URL;
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")} `;
  }
  return req;
});

export default API;

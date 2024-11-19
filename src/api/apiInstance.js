import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  timeout: 60000, // 1 minute
});

export default apiInstance;

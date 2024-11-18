import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 60000, // 1 minute
});

export default apiInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT ?? "http://localhost:5050",
  withCredentials: true,
  timeout: 1000 * 10,
});

export default axiosInstance;

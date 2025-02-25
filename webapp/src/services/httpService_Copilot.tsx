import axios from "axios";

export const http = axios.create({
  baseURL: "http://9.163.184.223:8080/",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 300000,
});
export default http;
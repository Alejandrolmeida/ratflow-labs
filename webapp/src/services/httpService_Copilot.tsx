import axios from "axios";

export const http = axios.create({
  baseURL: "https://ratflowassistant.azurewebsites.net/",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 300000,
});
export default http;
import { handleResponse, handleError } from "./apiUtils";
import axios from "axios";

export function getServers() {
  return axios.get('http://playground.tesonet.lt/v1/servers', {
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer '+localStorage.getItem("token"),
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

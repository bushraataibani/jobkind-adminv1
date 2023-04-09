import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_STATE_URL = URL + "/api/v1/getStateList";
export const ADD_STATE_URL = URL + "/api/v1/addUpdateStateData";
export const DELETE_STATE_URL = URL + "/api/v1/deleteStateData";

export function getAllState(data) {
  return axios.post(GET_STATE_URL, data);
}

export function addStateToServer(data) {
  return axios.put(ADD_STATE_URL, data);
}

export function deleteStateFromServer(id) {
  return axios.delete(DELETE_STATE_URL + "/" + id);
}

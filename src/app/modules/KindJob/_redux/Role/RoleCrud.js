import axios from "axios";
import { URL } from "../../Auth/_redux/authCrud";

export const GET_STATE_URL = URL + "/api/v1/getRoleList";
export const ADD_STATE_URL = URL + "/api/v1/addUpdateRoleData";
export const DELETE_STATE_URL = URL + "/api/v1/deleteRoleData";

export function getAllRole(data) {
  return axios.post(GET_STATE_URL, data);
}

export function addRoleToServer(data) {
  return axios.put(ADD_STATE_URL, data);
}

export function deleteRoleFromServer(id) {
  return axios.delete(DELETE_STATE_URL + "/" + id);
}

import axios from "axios";
import { URL } from "../../Auth/_redux/authCrud";

export const GET_AREA_URL = URL + "/api/v1/getAreaList";
export const ADD_AREA_URL = URL + "/api/v1/addUpdateAreaData";
export const DELETE_AREA_URL = URL + "/api/v1/deleteAreaData";

export function getAllArea(data) {
  return axios.post(GET_AREA_URL, data);
}

export function addAreaToServer(data) {
  return axios.put(ADD_AREA_URL, data);
}

export function deleteAreaFromServer(id) {
  return axios.delete(DELETE_AREA_URL + "/" + id);
}

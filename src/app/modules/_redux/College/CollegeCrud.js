import axios from "axios";
import { URL } from "../../Auth/_redux/authCrud";

export const GET_COLLEGE_URL = URL + "/api/v1/getCollageList";
export const ADD_COLLEGE_URL = URL + "/api/v1/addUpdateCollageData";
export const DELETE_COLLEGE_URL = URL + "/api/v1/deleteCollageData";
export const STATUS_COLLEGE_URL = URL + "/api/v1/statusCollageData";

export function getAllCollege(data) {
  return axios.post(GET_COLLEGE_URL, data);
}

export function addCollegeToServer(data) {
  return axios.put(ADD_COLLEGE_URL, data);
}

export function saveCollegeToServer(id, data) {
  return axios.put(STATUS_COLLEGE_URL + "/" + id, data);
}

export function deleteCollegeFromServer(id) {
  return axios.delete(DELETE_COLLEGE_URL + "/" + id);
}

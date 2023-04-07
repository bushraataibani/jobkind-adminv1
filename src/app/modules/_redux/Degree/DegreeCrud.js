import axios from "axios";
import { URL } from "../../Auth/_redux/authCrud";

export const GET_DEGREE_URL = URL + "/api/v1/getDegreeList";
export const ADD_DEGREE_URL = URL + "/api/v1/addUpdateDegreeData";
export const DELETE_DEGREE_URL = URL + "/api/v1/deleteDegreeData";

export function getAllDegree(data) {
  return axios.post(GET_DEGREE_URL, data);
}

export function addDegreeToServer(data) {
  return axios.put(ADD_DEGREE_URL, data);
}

export function deleteDegreeFromServer(id) {
  return axios.delete(DELETE_DEGREE_URL + "/" + id);
}

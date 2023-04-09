import axios from "axios";
import { URL } from "../../Auth/_redux/authCrud";

export const GET_DEPARTMENT_URL = URL + "/api/v1/getDepartmentList";
export const ADD_DEPARTMENT_URL = URL + "/api/v1/addUpdateDepartmentData";
export const DELETE_DEPARTMENT_URL = URL + "/api/v1/deleteDepartmentData";

export function getAllDepartment(data) {
  return axios.post(GET_DEPARTMENT_URL, data);
}

export function addDepartmentToServer(data) {
  return axios.put(ADD_DEPARTMENT_URL, data);
}

export function deleteDepartmentFromServer(id) {
  return axios.delete(DELETE_DEPARTMENT_URL + "/" + id);
}

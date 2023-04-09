import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_EDUCATION_URL = URL + "/api/v1/getEducationList";
export const ADD_EDUCATION_URL = URL + "/api/v1/addUpdateEducationData";
export const DELETE_EDUCATION_URL = URL + "/api/v1/deleteEducationData";

export function getAllEducation(data) {
  return axios.post(GET_EDUCATION_URL, data);
}

export function addEducationToServer(data) {
  return axios.put(ADD_EDUCATION_URL, data);
}

export function deleteEducationFromServer(id) {
  return axios.delete(DELETE_EDUCATION_URL + "/" + id);
}

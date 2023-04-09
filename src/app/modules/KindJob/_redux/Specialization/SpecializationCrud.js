import axios from "axios";
import { URL } from "../../Auth/_redux/authCrud";

export const GET_SPECIALIZATION_URL = URL + "/api/v1/getSpecializationList";
export const ADD_SPECIALIZATION_URL =
  URL + "/api/v1/addUpdateSpecializationData";
export const DELETE_SPECIALIZATION_URL =
  URL + "/api/v1/deleteSpecializationData";

export function getAllSpecialization(data) {
  return axios.post(GET_SPECIALIZATION_URL, data);
}

export function addSpecializationToServer(data) {
  return axios.put(ADD_SPECIALIZATION_URL, data);
}

export function deleteSpecializationFromServer(id) {
  return axios.delete(DELETE_SPECIALIZATION_URL + "/" + id);
}

import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_PERMISSION_URL = URL + "/api/v1/getPermissionData";

export const ADD_PERMISSION_URL =
  URL + "/api/v1/addUpdatePermissionProfileData";

export const DELETE_PERMISSION_URL =
  URL + "/api/v1/deletePermissionProfileData";

export const GET_PERMISSION_PROFILE_URL =
  URL + "/api/v1/getPermissionProfileList";

export const GET_PERMISSION_PROFILE_ID_URL =
  URL + "/api/v1/getProfilePermissionList";

export function getAllPermission(data) {
  return axios.get(GET_PERMISSION_URL, data);
}

export function addPermissionToServer(data) {
  return axios.put(ADD_PERMISSION_URL, data);
}

export function deletePermissionFromServer(id) {
  return axios.delete(DELETE_PERMISSION_URL + "/" + id);
}

export function getAllPermissionProfile(data) {
  return axios.post(GET_PERMISSION_PROFILE_URL, data);
}

export function getPermissionProfileByID(id) {
  return axios.get(GET_PERMISSION_PROFILE_ID_URL + "/" + id);
}

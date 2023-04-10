import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_STAFF_URL = URL + "/api/v1/getStaffUserList";
export const ADD_STAFF_URL = URL + "/api/v1/addUpdateStaffUserData";
export const DELETE_STAFF_URL = URL + "/api/v1/deleteCollageData";

export function getAllStaff(data) {
  return axios.post(GET_STAFF_URL, data);
}

export function addStaffToServer(data) {
  return axios.put(ADD_STAFF_URL, data);
}

export function deleteStaffFromServer(id) {
  return axios.delete(DELETE_STAFF_URL + "/" + id);
}

import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_EMPLOYEE_URL = URL + "/api/v1/listEmployee";
export const GET_APPLIED_JOBS_URL = URL + "/api/v1/listAppliedEmployeeJobs";
export const GET_SUCESS_JOBS_URL = URL + "/api/v1/listSuccessEmployeeJobs";
export const USER_ACTION = URL + "/api/v1/userAction";
export const GET_USER_PROFILE = URL + "/api/v1/userProfileData";

export function getAllEmployee(data) {
  return axios.post(GET_EMPLOYEE_URL, data);
}

export function getAppliedJobs(data) {
  return axios.post(GET_APPLIED_JOBS_URL, data);
}

export function getSuccessJobs(data) {
  return axios.post(GET_SUCESS_JOBS_URL, data);
}

export function postUserAction(data) {
  return axios.put(USER_ACTION, data);
}

export function getUserProfile(id) {
  return axios.get(GET_USER_PROFILE + "/" + id);
}

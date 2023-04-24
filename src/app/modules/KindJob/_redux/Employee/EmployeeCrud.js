import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_EMPLOYEE_URL = URL + "/api/v1/listEmployee";
export const GET_APPLIED_JOBS_URL = URL + "/api/v1/listAppliedJobs";
export const GET_SUCESS_JOBS_URL = URL + "/api/v1/listSuccessEmployeeJobs";
export const USER_ACTION = URL + "/api/v1/userAction";
export const GET_USER_PROFILE = URL + "/api/v1/userProfileData";

export function getAllEmployee(data) {
  return axios.post(GET_EMPLOYEE_URL, data);
}

export function getAppliedJobs(data) {
  return axios.post(GET_EMPLOYEE_URL, data);
}

export function getSuccessJobs(data) {
  return axios.post(GET_EMPLOYEE_URL, data);
}

export function postUserAction(data) {
  return axios.post(GET_EMPLOYEE_URL, data);
}

export function getUserProfile(data) {
  return axios.post(GET_EMPLOYEE_URL, data);
}

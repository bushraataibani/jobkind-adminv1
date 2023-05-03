import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_JOB_APPLY_EMPLOYEE_URL = URL + "/api/v1/getJobApplyEmployees";
export const GET_EMPLOYEE_APPLY_JOB_URL = URL + "/api/v1/getEmployeeApplyJobs";
export const GET_JOB_APPLY_EMPLOYEE_PROFILE_URL =
  URL + "/api/v1/getJobApplyEmployeesProfile";
export const GET_EMPLOYEE_APPLY_JOB_PROFILE_URL =
  URL + "/api/v1/getEmployeeApplyJobProfile";
export const JOB_APPLY_EMPLOYEE_STATUS_URL =
  URL + "/api/v1/setJobApplyEmployeesStatus";

export function getAllJobAppyEmployee(data) {
  return axios.post(GET_JOB_APPLY_EMPLOYEE_URL, data);
}

export function getAllEmployeeApplyJobs(data) {
  return axios.post(GET_EMPLOYEE_APPLY_JOB_URL, data);
}

export function getJobApplyEmployeeProfile(id) {
  return axios.get(GET_JOB_APPLY_EMPLOYEE_PROFILE_URL + "/" + id);
}

export function getEmployeeApplyJobProfile(id) {
  return axios.get(GET_EMPLOYEE_APPLY_JOB_PROFILE_URL + "/" + id);
}

export function setJobApplyEmployeeStatus(data) {
  return axios.put(JOB_APPLY_EMPLOYEE_STATUS_URL, data);
}

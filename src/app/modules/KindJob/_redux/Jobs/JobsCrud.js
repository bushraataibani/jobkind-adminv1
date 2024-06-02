import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_JOB_URL = URL + "/api/v1/getJobsList";
export const ADD_EMPLOYEE_URL = URL + "/api/v1/listEmployee";
export const EXPIRE_EMPLOYEE_JOB_URL = URL + "/api/v1/setExpireJob";
export const ASSIGN_EMPLOYEE_URL = URL + "/api/v1/assignJobToEmployee";
export const APPLY_EMPLOYEE_URL = URL + "/api/v1/getJobApplyEmployees";

export function getAllListJob(data) {
  return axios.post(GET_JOB_URL, data);
}

export function getAllListEmployee(data) {
  return axios.post(ADD_EMPLOYEE_URL, data);
}

export function expireCandidateJobFromServer(data) {
  return axios.put(EXPIRE_EMPLOYEE_JOB_URL, data);
}

export function assignListEmployee(data) {
  return axios.post(ASSIGN_EMPLOYEE_URL, data);
}

export function getAllApplyEmployeeData(data) {
  return axios.post(APPLY_EMPLOYEE_URL, data);
}

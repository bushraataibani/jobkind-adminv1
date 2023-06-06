import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_JOB_URL = URL + "/api/v1/getJobsList";
export const ADD_EMPLOYEE_URL = URL + "/api/v1/listEmployee";

export function getAllListJob(data) {
  return axios.post(GET_JOB_URL, data);
}

export function getAllListEmployee(data) {
  return axios.post(ADD_EMPLOYEE_URL, data);
}

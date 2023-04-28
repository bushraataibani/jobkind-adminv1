import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_EMPLOYER_URL = URL + "/api/v1/listEmployer";
export const GET_EMPLOYER_PROFILE = URL + "/api/v1/employerProfileData";
export const GET_EMPLOYER_JOBS_URL = URL + "/api/v1/employerJobsList";
export const GET_EMPLOYER_JOBS_DETAILS_URL = URL + "/api/v1/employerJobDetails";
export const GET_JOBS_APPLY_URL = URL + "/api/v1/employerJobApplyEmployeeList";
export const EMPLOYER_ACTION = URL + "/api/v1/employeeAction";

export function getAllEmployer(data) {
  return axios.post(GET_EMPLOYER_URL, data);
}

export function getEmployerProfile(id) {
  return axios.get(GET_EMPLOYER_PROFILE + "/" + id);
}

export function getEmployerJobs(data) {
  return axios.post(GET_EMPLOYER_JOBS_URL, data);
}

export function getEmployerJobDetails(id) {
  return axios.get(GET_EMPLOYER_JOBS_DETAILS_URL + "/" + id);
}

export function getEmployeeJobApply(data) {
  return axios.post(GET_JOBS_APPLY_URL, data);
}

export function postEmployerAction(data) {
  return axios.put(EMPLOYER_ACTION, data);
}

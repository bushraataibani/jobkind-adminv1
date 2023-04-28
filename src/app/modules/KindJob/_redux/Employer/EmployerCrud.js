import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_EMPLOYER_URL = URL + "/api/v1/listEmployer";
export const GET_EMPLOYER_JOB_URL = URL + "/api/v1/employerJobsList";
export const GET_JOBS_DETAILS_URL = URL + "/api/v1/employerJobDetails";
export const GET_JOBS_APPLY_LIST_URL =
  URL + "/api/v1/employerJobApplyEmployeeList";
export const EMPLOYER_ACTION = URL + "/api/v1/userAction";
export const GET_EMPLOYER_PROFILE = URL + "/api/v1/employerProfileData";

export function getAllEmployer(data) {
  return axios.post(GET_EMPLOYER_URL, data);
}

export function getAppliedJobs(data) {
  return axios.post(GET_JOBS_DETAILS_URL, data);
}

export function getSuccessJobs(data) {
  return axios.post(GET_JOBS_APPLY_LIST_URL, data);
}

export function postEmployerAction(data) {
  return axios.put(EMPLOYER_ACTION, data);
}

export function getEmployerProfile(id) {
  return axios.get(GET_EMPLOYER_PROFILE + "/" + id);
}

import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_EMPLOYER_URL = URL + "/api/v1/listEmployer";
export const GET_EMPLOYER_PROFILE = URL + "/api/v1/employerProfileData";
export const EMPLOYER_ACTION = URL + "/api/v1/userAction";

export const GET_EMPLOYER_JOB_URL = URL + "/api/v1/employerJobsList";
export const GET_JOBS_DETAILS_URL = URL + "/api/v1/employerJobDetails";
export const GET_JOBS_APPLY_LIST_URL =
  URL + "/api/v1/employerJobApplyEmployeeList";

export const GET_EMPLOYER_COIN_HISTORY_URL =
  URL + "/api/v1/listEmployerCoinTransactions";

export const ADD_COIN_URL = URL + "/api/v1/addCoin";

export function getAllEmployer(data) {
  return axios.post(GET_EMPLOYER_URL, data);
}

export function getEmployerProfile(id) {
  return axios.get(GET_EMPLOYER_PROFILE + "/" + id);
}

export function postEmployerAction(data) {
  return axios.put(EMPLOYER_ACTION, data);
}

export function getAllEmployerJob(data) {
  return axios.post(GET_EMPLOYER_JOB_URL, data);
}

export function getEmployerCoinHistory(data) {
  return axios.post(GET_EMPLOYER_COIN_HISTORY_URL, data);
}

export function addCoin(data) {
  return axios.post(ADD_COIN_URL, data);
}

export function getEmployerJobDetails(id) {
  return axios.get(GET_JOBS_DETAILS_URL + "/" + id);
}

export function getAllAppliedJobList(data) {
  return axios.post(GET_JOBS_APPLY_LIST_URL, data);
}

import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_JOB_URL = URL + "/api/v1/getJobList";
export const ADD_JOB_URL = URL + "/api/v1/addUpdateJobsData";
export const DELETE_JOB_URL = URL + "/api/v1/deleteJobsData";

export function getAllJob(data) {
  return axios.post(GET_JOB_URL, data);
}

export function addJobToServer(data) {
  return axios.put(ADD_JOB_URL, data);
}

export function deleteJobFromServer(id) {
  return axios.delete(DELETE_JOB_URL + "/" + id);
}

import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_CANDIDATE_MGT_URL = URL + "/api/v1/getCandidateList";
export const ADD_CANDIDATE_MGT_URL = URL + "/api/v1/addUpdateCandidateData";
export const DELETE_CANDIDATE_MGT_URL = URL + "/api/v1/deleteCandidateData";

export function getAllCandidateMgt(data) {
  return axios.post(GET_CANDIDATE_MGT_URL, data);
}

export function addCandidateMgtToServer(data) {
  return axios.put(ADD_CANDIDATE_MGT_URL, data);
}

export function deleteCandidateMgtFromServer(id) {
  return axios.delete(DELETE_CANDIDATE_MGT_URL + "/" + id);
}

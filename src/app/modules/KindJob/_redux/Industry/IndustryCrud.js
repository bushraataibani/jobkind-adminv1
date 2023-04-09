import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_INDUSTRY_URL = URL + "/api/v1/getIndustriesList";
export const ADD_INDUSTRY_URL = URL + "/api/v1/addUpdateIndustriesData";
export const DELETE_INDUSTRY_URL = URL + "/api/v1/deleteIndustriesData";

export function getAllIndustry(data) {
  return axios.post(GET_INDUSTRY_URL, data);
}

export function addIndustryToServer(data) {
  return axios.put(ADD_INDUSTRY_URL, data);
}

export function deleteIndustryFromServer(id) {
  return axios.delete(DELETE_INDUSTRY_URL + "/" + id);
}

import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_SEO_URL = URL + "/api/v1/getSeoList";
export const ADD_SEO_URL = URL + "/api/v1/addUpdateSeoData";
export const DELETE_SEO_URL = URL + "/api/v1/deleteSeoData";
export const GET_SEO_SLUG_URL = URL + "/api/v1/getPageSlug";

export function getAllSeo(data) {
  return axios.post(GET_SEO_URL, data);
}

export function addSeoToServer(data) {
  return axios.put(ADD_SEO_URL, data);
}

export function deleteSeoFromServer(id) {
  return axios.delete(DELETE_SEO_URL + "/" + id);
}

export function getSeoPageSlug() {
  return axios.get(GET_SEO_SLUG_URL);
}

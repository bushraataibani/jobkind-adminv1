import axios from "axios";
import { URL } from "../../Auth/_redux/authCrud";

export const GET_LANGUAGE_URL = URL + "/api/v1/getLanguagesList";
export const ADD_LANGUAGE_URL = URL + "/api/v1/addUpdateLanguagesData";
export const DELETE_LANGUAGE_URL = URL + "/api/v1/deleteLanguagesData";

export function getAllLanguage(data) {
  return axios.post(GET_LANGUAGE_URL, data);
}

export function addLanguageToServer(data) {
  return axios.put(ADD_LANGUAGE_URL, data);
}

export function deleteLanguageFromServer(id) {
  return axios.delete(DELETE_LANGUAGE_URL + "/" + id);
}

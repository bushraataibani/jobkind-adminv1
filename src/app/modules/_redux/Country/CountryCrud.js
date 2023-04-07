import axios from "axios";
import { URL } from "../../Auth/_redux/authCrud";

export const GET_COUNTRY_URL = URL + "/api/v1/getCountryList";
export const ADD_COUNTRY_URL = URL + "/api/v1/addUpdateCountryData";
export const DELETE_COUNTRY_URL = URL + "/api/v1/deleteCountryData";

export function getAllCountry(data) {
  return axios.post(GET_COUNTRY_URL, data);
}

export function addCountryToServer(data) {
  return axios.put(ADD_COUNTRY_URL, data);
}

export function deleteCountryFromServer(id) {
  return axios.delete(DELETE_COUNTRY_URL + "/" + id);
}

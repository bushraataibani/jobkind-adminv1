import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_CITY_URL = URL + "/api/v1/getCityList";
export const ADD_CITY_URL = URL + "/api/v1/addUpdateCityData";
export const DELETE_CITY_URL = URL + "/api/v1/deleteCityData";

export function getAllCity(data) {
  return axios.post(GET_CITY_URL, data);
}

export function addCityToServer(data) {
  return axios.put(ADD_CITY_URL, data);
}

export function deleteCityFromServer(id) {
  return axios.delete(DELETE_CITY_URL + "/" + id);
}

import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_SUBSCRIBE_URL = URL + "/api/v1/getSubscriberList";
export const ADD_SUBSCRIBE_URL = URL + "/api/v1/addUpdateSubscriberData";
export const DELETE_SUBSCRIBE_URL = URL + "/api/v1/deleteSubscriberData";

export function getAllSubscribe(data) {
  return axios.post(GET_SUBSCRIBE_URL, data);
}

export function addSubscribeToServer(data) {
  return axios.put(ADD_SUBSCRIBE_URL, data);
}

export function deleteSubscribeFromServer(id) {
  return axios.delete(DELETE_SUBSCRIBE_URL + "/" + id);
}

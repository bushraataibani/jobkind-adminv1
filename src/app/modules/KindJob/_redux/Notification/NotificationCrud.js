import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_NOTIFICATION_URL = URL + "/api/v1/getNotificationData";
export const ADD_NOTIFICATION_URL = URL + "/api/v1/sendCustomNotification";
export const VIEW_NOTIFICATION_URL = URL + "/api/v1/getNotificationUserData";

export function getAllNotification(data) {
  return axios.post(GET_NOTIFICATION_URL, data);
}

export function sendNotificationToServer(data) {
  return axios.post(ADD_NOTIFICATION_URL, data);
}

export function viewNotificationFromServer(id) {
  return axios.get(VIEW_NOTIFICATION_URL + "/" + id);
}

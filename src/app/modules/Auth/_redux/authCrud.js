import axios from "axios";

export const URL = "https://api.kindjob.quickoninfotech.com";
export const notificationURL = "https://api.kindjob.quickoninfotech.com/data/";
export const LOGIN_URL = URL + "/api/v1/loginAdmin";
export const ME_URL = URL + "/api/v1/getUserByToken";
export const LOGOUT_URL = URL + "/api/v1/logout";

export function loginCrud(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export async function logout(token) {
  return axios.get(LOGOUT_URL, {
    Authorization: token,
  });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}

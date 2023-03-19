import axios from "axios";

export const URL = "https://api.kindjob.quickoninfotech.com";
export const LOGIN_URL = URL + "/api/v1/loginAdmin";

export const ME_URL = URL + "/api/v1/getUserByToken";

export function loginCrud(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}

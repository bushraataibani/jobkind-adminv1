import axios from "axios";
import { URL } from "../../Auth/_redux/authCrud";

export const GET_COLLEGE_URL = URL + "/api/v1/getCollageList";
export const ADD_COLLEGE_URL = URL + "/api/v1/addUpdateCollageData";
export const DELETE_COLLEGE_URL = URL + "/api/v1/deleteCollageData";
export const STATUS_COLLEGE_URL = URL + "/api/v1/statusCollageData";

// export function masterPaginate(
//   filter,
//   page,
//   pageDataLimit = 10,
//   sort = { name: "ASC" }
// ) {
//   return axios.post(MASTER_URL + "/paginate", {
//     filter: filter,
//     pagination: {
//       page: page,
//       ...(pageDataLimit !== -1 && { limit: pageDataLimit }),
//     },
//     sort: sort,
//   });
// }

export function getAllCollege() {
  return axios.post(GET_COLLEGE_URL);
}

// export function getCollege(id) {
//   return axios.get(MASTER_URL + "/" + id);
// }

export function addCollegeToServer(data) {
  return axios.put(ADD_COLLEGE_URL, data);
}

export function deleteCollegeFromServer(id) {
  return axios.delete(DELETE_COLLEGE_URL + "/" + id);
}

export function saveCollegeToServer(id, data) {
  return axios.put(STATUS_COLLEGE_URL + "/" + id, data);
}

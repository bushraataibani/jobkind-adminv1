import axios from "axios";
import { URL } from "../../Auth/_redux/authCrud";

export const GET_SKILL_URL = URL + "/api/v1/getSkillList";
export const ADD_SKILL_URL = URL + "/api/v1/addUpdateSkillData";
export const DELETE_SKILL_URL = URL + "/api/v1/deleteSkillData";

export function getAllSkill(data) {
  return axios.post(GET_SKILL_URL, data);
}

export function addSkillToServer(data) {
  return axios.put(ADD_SKILL_URL, data);
}

export function deleteSkillFromServer(id) {
  return axios.delete(DELETE_SKILL_URL + "/" + id);
}

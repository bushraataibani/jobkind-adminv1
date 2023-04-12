import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_PLAN_URL = URL + "/api/v1/getPlanList";
export const ADD_PLAN_URL = URL + "/api/v1/addUpdatePlanData";
export const DELETE_PLAN_URL = URL + "/api/v1/deletePlanData";

export function getAllPlan(data) {
  return axios.post(GET_PLAN_URL, data);
}

export function addPlanToServer(data) {
  return axios.put(ADD_PLAN_URL, data);
}

export function deletePlanFromServer(id) {
  return axios.delete(DELETE_PLAN_URL + "/" + id);
}

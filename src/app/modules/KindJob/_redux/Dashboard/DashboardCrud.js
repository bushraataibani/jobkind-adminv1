import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_STATISTICS_URL = URL + "/api/v1/getStatisticsData";
export const GET_MONTHLY_REVENUE_URL =
  URL + "/api/v1/getTotalRevenueMonthWiseData";
export const DELETE_LANGUAGE_URL = URL + "/api/v1/deleteLanguagesData";

export function getAllStatData() {
  return axios.get(GET_STATISTICS_URL);
}

export function getAllMontlyRevenue() {
  return axios.get(GET_MONTHLY_REVENUE_URL);
}

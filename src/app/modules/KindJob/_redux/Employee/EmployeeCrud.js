import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const GET_EMPLOYEE_URL = URL + "/api/v1/listEmployee";
export const GET_APPLIED_JOBS_URL = URL + "/api/v1/listAppliedEmployeeJobs";
export const GET_SUCESS_JOBS_URL = URL + "/api/v1/listSuccessEmployeeJobs";
export const USER_ACTION = URL + "/api/v1/userAction";
export const GET_USER_PROFILE = URL + "/api/v1/userProfileData";

export const ADD_CANDIDIATE_RESUME_URL = URL + "/api/v1/fileUpload";
export const ADD_OFFLINE_CANDIDIATE = URL + "/api/v1/addUpdateEmployee";

export function getAllEmployee(data) {
  return axios.post(GET_EMPLOYEE_URL, data);
}

export function getAppliedJobs(data) {
  return axios.post(GET_APPLIED_JOBS_URL, data);
}

export function getSuccessJobs(data) {
  return axios.post(GET_SUCESS_JOBS_URL, data);
}

export function postUserAction(data) {
  return axios.put(USER_ACTION, data);
}

export function getUserProfile(id) {
  return axios.get(GET_USER_PROFILE + "/" + id);
}

export function addResumeToServer(data, dispatch, actions) {
  const config2 = {
    onUploadProgress: (progress) => {
      const { loaded, total } = progress;
      const percentageProgress = Math.floor((loaded / total) * 100);

      if (percentageProgress) {
        dispatch(actions.setFileProgress(percentageProgress));
      }
    },
  };

  return axios.post(ADD_CANDIDIATE_RESUME_URL, data, config2);
}

export function addOfflineEmployeeToServer(data) {
  return axios.post(ADD_OFFLINE_CANDIDIATE, data);
}

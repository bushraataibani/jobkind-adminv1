import axios from "axios";
import { URL } from "../../../Auth/_redux/authCrud";

export const ADD_CANDIDIATE_MGT_RESUME_URL = URL + "/api/v1/fileUpload";
export const ADD_CANDIDATE_MGT_URL = URL + "/api/v1/addUpdateCandidateData";
export const DELETE_CANDIDATE_MGT_URL = URL + "/api/v1/deleteCandidateData";

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

  return axios.post(ADD_CANDIDIATE_MGT_RESUME_URL, data, config2);
}

export function addCandidateMgtToServer(data) {
  return axios.put(ADD_CANDIDATE_MGT_URL, data);
}

export function deleteCandidateMgtFromServer(id) {
  return axios.delete(DELETE_CANDIDATE_MGT_URL + "/" + id);
}

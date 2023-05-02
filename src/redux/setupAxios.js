import { generalSlice } from "../app/modules/KindJob/_redux/general/generalSlice";
import history from "./history";

export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    (config) => {
      const {
        auth: { authToken },
      } = store.getState();

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error.response);
      let errorMessage = "",
        api = "";
      const errObject = error.response;
      const errRequest = errObject?.request;

      if (
        (error.response?.status === 401 &&
          error.response?.data?.message === "Invalid Token." &&
          window.location.pathname !== "/auth/login") ||
        (error.response?.status === 401 &&
          error.response?.statusText === "Unauthorized" &&
          window.location.pathname !== "/auth/login")
      ) {
        history.push("/logout");
      }

      if (errRequest) {
        const endPoint = errRequest.responseURL?.split("api");

        if (errRequest.statusText) errorMessage += " " + errRequest.statusText;

        if (errRequest.status)
          errorMessage += "(Error Code:" + errRequest.status + ")";

        if (errObject.config.method)
          api +=
            errObject.config.method?.toUpperCase() +
            " api" +
            endPoint[1] +
            " failed";

        store.dispatch(
          generalSlice.actions.pushNewAlert({
            show: true,
            heading: "Error",
            errMessage: errorMessage,
            errDescription: errObject?.data?.error,
            message: api,
            type: "danger",
          })
        );
      }

      return Promise.reject(error);
    }
  );
}

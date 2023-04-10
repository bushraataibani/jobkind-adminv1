import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import Job from "./Job";
import JobAdd from "./components/JobAdd/JobAdd";
import JobDelete from "./components/JobDelete/JobDelete";
import JobView from "./components/JobView/JobView";
import { JobSlice } from "../../../_redux/Job/JobSlice";

export const JobContext = createContext(null);

export default function JobRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = JobSlice;

  const UIEvents = {
    addJob: () => {
      history.push(`/master/job/add`);
    },
    openViewJobDialog: (id) => {
      history.push(`/master/job/${id}/view`);
    },
    deleteJob: (id) => {
      history.push(`/master/job/${id}/delete`);
    },
  };

  return (
    <JobContext.Provider value={UIEvents}>
      <Job />

      <Route path="/master/job/add">
        {({ history, match }) => (
          <JobAdd
            show={match != null}
            onHide={() => {
              history.push("/master/job");
            }}
          />
        )}
      </Route>

      <Route path="/master/job/:id/view">
        {({ history, match }) => (
          <JobView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/job");
              dispatch(actions.removeSelectedJob());
            }}
          />
        )}
      </Route>

      <Route path="/master/job/:id/delete">
        {({ history, match }) => (
          <JobDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/job");
              dispatch(actions.removeSelectedJob());
            }}
          />
        )}
      </Route>
    </JobContext.Provider>
  );
}

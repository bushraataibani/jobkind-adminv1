import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { AppliedJobSlice } from "../_redux/AppliedJob/AppliedJobSlice";
import AppliedJob from "./AppliedJob";
import AppliedJobProfile from "./components/AppliedJobProfile/AppliedJobProfile";

export const AppliedJobContext = createContext(null);

export default function AppliedJobRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = AppliedJobSlice;

  const UIEvents = {
    appliedJobProfile: (id) => {
      history.push(`/applied-job/${id}/profile`);
    },
  };

  return (
    <AppliedJobContext.Provider value={UIEvents}>
      <Route path="/applied-job">
        {({ history, match }) => (
          <AppliedJob
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/applied-job");
              dispatch(actions.removeSelectedAppliedJob());
            }}
          />
        )}
      </Route>

      <Route path="/applied-job/:id/profile">
        {({ history, match }) => (
          <AppliedJobProfile
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/applied-job");
              dispatch(actions.removeSelectedAppliedJob());
            }}
          />
        )}
      </Route>
    </AppliedJobContext.Provider>
  );
}

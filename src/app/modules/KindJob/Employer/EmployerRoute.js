import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { EmployerSlice } from "../_redux/Employer/EmployerSlice";
import Employer from "./Employer";
import EmployerProfileModal from "./components/EmployerProfileModal/EmployerProfileModal";
import BlockEmployerModal from "./components/BlockEmployerModal/BlockEmployerModal";
import EmployerJob from "./modules/EmployerJob/EmployerJob";
import EmployerJobApplyEmployeeView from "./modules/EmployerJob/components/EmployerJobApplyEmployeeView/EmployerJobApplyEmployeeView";

export const EmployerContext = createContext(null);

export default function EmployerRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const UIEvents = {
    employerProfileView: (id) => {
      history.push(`/employer/${id}/profile-view`);
    },
    employerJobDialog: (id) => {
      history.push(`/employer/${id}/profile-view/job`);
    },
    employerJobApplyEmployeeDialog: (user_id, id) => {
      history.push(`/employer/${user_id}/profile-view/job/${id}/job-apply`);
    },
    blockEmployer: (id) => {
      history.push(`/employer/${id}/employer-block`);
    },
  };

  return (
    <EmployerContext.Provider value={UIEvents}>
      <Employer />

      <Route path="/employer/:id/profile-view">
        {({ history, match }) => (
          <EmployerProfileModal
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employer");
              dispatch(actions.removeSelectedEmployer());
            }}
          />
        )}
      </Route>

      <Route path="/employer/:id/profile-view/job">
        {({ history, match }) => (
          <EmployerJob
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employer/:id/profile-view");
              dispatch(actions.removeSelectedEmployer());
            }}
          />
        )}
      </Route>

      <Route path="/employer/:user_id/profile-view/job/:id/job-apply">
        {({ history, match }) => (
          <EmployerJobApplyEmployeeView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employer/:id/profile-view/job");
              dispatch(actions.removeSelectedEmployer());
            }}
          />
        )}
      </Route>

      <Route path="/employer/:id/employer-block">
        {({ history, match }) => (
          <BlockEmployerModal
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employer");
              dispatch(actions.removeSelectedEmployer());
            }}
          />
        )}
      </Route>
    </EmployerContext.Provider>
  );
}

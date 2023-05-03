import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { EmployerSlice } from "../_redux/Employer/EmployerSlice";
import Employer from "./Employer";
import EmployerJob from "./modules/EmployerJob/EmployerJob";
import EmployerJobApply from "./modules/EmployerJobApply/EmployerJobApply";

export const EmployerContext = createContext(null);

export default function EmployerRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const UIEvents = {
    employerJobList: (id) => {
      history.push(`/employer/${id}/job`);
    },
    employerJobApplyEmployee: (user_id, id) => {
      history.push(`/employer/${user_id}/job/${id}/view`);
    },
  };

  return (
    <EmployerContext.Provider value={UIEvents}>
      <Route path="/employer" exact>
        {({ history, match }) => (
          <Employer
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employer");
              dispatch(actions.removeSelectedEmployer());
            }}
          />
        )}
      </Route>

      <Route path="/employer/:id/job" exact>
        {({ history, match }) => (
          <EmployerJob
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employer");
              dispatch(actions.removeSelectedEmployer());
            }}
          />
        )}
      </Route>

      <Route path="/employer/:user_id/job/:id/view" exact>
        {({ history, match }) => {
          return (
            <EmployerJobApply
              show={match != null}
              userId={match && match.params.user_id}
              mainJobId={match && match.params.id}
              onHide={() => {
                history.push("/employer");
                dispatch(actions.removeSelectedEmployer());
              }}
            />
          );
        }}
      </Route>
    </EmployerContext.Provider>
  );
}

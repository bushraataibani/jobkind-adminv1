import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { EmployerSlice } from "../_redux/Employer/EmployerSlice";
import BlockEmployerModal from "./components/BlockEmployerModal/BlockEmployerModal";
import Employer from "./Employer";

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
    blockEmployer: (id) => {
      history.push(`/employer/${id}/employer-block`);
    },
  };

  return (
    <EmployerContext.Provider value={UIEvents}>
      <Employer />

      <Route path="/employer/:id/job">{({ history, match }) => <></>}</Route>

      <Route path="/employer/:user_id/job/:id/view">
        {({ history, match }) => <></>}
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

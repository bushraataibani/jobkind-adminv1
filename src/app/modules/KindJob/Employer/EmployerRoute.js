import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { EmployerSlice } from "../_redux/Employer/EmployerSlice";
import BlockEmployerModal from "./components/BlockEmployerModal/BlockEmployerModal";
import EmployerProfileModal from "./components/EmployerProfileModal/EmployerProfileModal";
import Employer from "./Employer";

export const EmployerContext = createContext(null);

export default function EmployerRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const UIEvents = {
    employerProfileView: (id) => {
      history.push(`/employer-management/employer/${id}/profile-view`);
    },
    blockEmployer: (id) => {
      history.push(`/employer-management/employer/${id}/employer-block`);
    },
  };

  return (
    <EmployerContext.Provider value={UIEvents}>
      <Employer />

      <Route path="/employer-management/employer/:id/profile-view">
        {({ history, match }) => (
          <EmployerProfileModal
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employer-management/employer");
              dispatch(actions.removeSelectedEmployer());
            }}
          />
        )}
      </Route>

      <Route path="/employer-management/employer/:id/employer-block">
        {({ history, match }) => (
          <BlockEmployerModal
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employer-management/employer");
              dispatch(actions.removeSelectedEmployer());
            }}
          />
        )}
      </Route>
    </EmployerContext.Provider>
  );
}

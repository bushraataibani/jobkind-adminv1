import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { EmployeeSlice } from "../_redux/Employee/EmployeeSlice";
import BlockEmployeeModal from "./components/BlockEmployeeModal/BlockEmployeeModal";
import EmployeeProfileModal from "./components/EmployeeProfileModal/EmployeeProfileModal";
import Employee from "./Employee";

export const EmployeeContext = createContext(null);

export default function EmployeeRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = EmployeeSlice;

  const UIEvents = {
    employeeProfileView: (id) => {
      history.push(`/employee/${id}/profile-view`);
    },
    blockEmployee: (id) => {
      history.push(`/employee/${id}/employee-block`);
    },
  };

  return (
    <EmployeeContext.Provider value={UIEvents}>
      <Employee />

      <Route path="/employee/:id/profile-view">
        {({ history, match }) => (
          <EmployeeProfileModal
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employee");
              dispatch(actions.removeSelectedEmployee());
            }}
          />
        )}
      </Route>

      <Route path="/employee/:id/employee-block">
        {({ history, match }) => (
          <BlockEmployeeModal
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employee");
              dispatch(actions.removeSelectedEmployee());
            }}
          />
        )}
      </Route>
    </EmployeeContext.Provider>
  );
}

import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { DepartmentSlice } from "../../../_redux/Department/DepartmentSlice";
import DepartmentAdd from "./components/DepartmentAdd/DepartmentAdd";
import DepartmentDelete from "./components/DepartmentDelete/DepartmentDelete";
import DepartmentView from "./components/DepartmentView/DepartmentView";
import Department from "./Department";

export const DepartmentContext = createContext(null);

export default function DepartmentRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = DepartmentSlice;

  const UIEvents = {
    addDepartment: () => {
      history.push(`/master/department/add`);
    },
    openViewDepartmentDialog: (id) => {
      history.push(`/master/department/${id}/view`);
    },
    deleteDepartment: (id) => {
      history.push(`/master/department/${id}/delete`);
    },
  };

  return (
    <DepartmentContext.Provider value={UIEvents}>
      <Department />

      <Route path="/master/department/add">
        {({ history, match }) => (
          <DepartmentAdd
            show={match != null}
            onHide={() => {
              history.push("/master/department");
            }}
          />
        )}
      </Route>

      <Route path="/master/department/:id/view">
        {({ history, match }) => (
          <DepartmentView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/department");
              dispatch(actions.removeSelectedDepartment());
            }}
          />
        )}
      </Route>

      <Route path="/master/department/:id/delete">
        {({ history, match }) => (
          <DepartmentDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/department");
              dispatch(actions.removeSelectedDepartment());
            }}
          />
        )}
      </Route>
    </DepartmentContext.Provider>
  );
}

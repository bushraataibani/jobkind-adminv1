import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import Role from "./Role";
import RoleAdd from "./components/RoleAdd/RoleAdd";
import RoleDelete from "./components/RoleDelete/RoleDelete";
import RoleView from "./components/RoleView/RoleView";
import { RoleSlice } from "../../../_redux/Role/RoleSlice";

export const RoleContext = createContext(null);

export default function RoleRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = RoleSlice;

  const UIEvents = {
    addRole: () => {
      history.push(`/master/role/add`);
    },
    openViewRoleDialog: (id) => {
      history.push(`/master/role/${id}/view`);
    },
    deleteRole: (id) => {
      history.push(`/master/role/${id}/delete`);
    },
  };

  return (
    <RoleContext.Provider value={UIEvents}>
      <Role />

      <Route path="/master/role/add">
        {({ history, match }) => (
          <RoleAdd
            show={match != null}
            onHide={() => {
              history.push("/master/role");
            }}
          />
        )}
      </Route>

      <Route path="/master/role/:id/view">
        {({ history, match }) => (
          <RoleView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/role");
              dispatch(actions.removeSelectedRole());
            }}
          />
        )}
      </Route>

      <Route path="/master/role/:id/delete">
        {({ history, match }) => (
          <RoleDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/role");
              dispatch(actions.removeSelectedRole());
            }}
          />
        )}
      </Route>
    </RoleContext.Provider>
  );
}

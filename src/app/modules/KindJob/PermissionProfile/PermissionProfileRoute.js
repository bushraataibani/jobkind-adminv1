import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { PermissionProfileSlice } from "../_redux/PermissionProfile/PermissionProfileSlice";
import PermissionProfileAdd from "./components/PermissionProfileAdd/PermissionProfileAdd";
import PermissionProfileDelete from "./components/PermissionProfileDelete/PermissionProfileDelete";
import PermissionProfileView from "./components/PermissionProfileView/PermissionProfileView";
import PermissionProfile from "./PermissionProfile";

export const PermissionProfileContext = createContext(null);

export default function PermissionProfileRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = PermissionProfileSlice;

  const UIEvents = {
    addPermissionProfile: () => {
      history.push(`/permission/add`);
    },
    openViewPermissionProfileDialog: (id) => {
      history.push(`/permission/${id}/view`);
    },
    deletePermissionProfile: (id) => {
      history.push(`/permission/${id}/delete`);
    },
  };

  return (
    <PermissionProfileContext.Provider value={UIEvents}>
      <PermissionProfile />

      <Route path="/permission/add">
        {({ history, match }) => (
          <PermissionProfileAdd
            show={match != null}
            onHide={() => {
              history.push("/permission");
            }}
          />
        )}
      </Route>

      <Route path="/permission/:id/view">
        {({ history, match }) => (
          <PermissionProfileView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/permission");
              dispatch(actions.removeSelectedProfilePermission());
            }}
          />
        )}
      </Route>

      <Route path="/permission/:id/delete">
        {({ history, match }) => (
          <PermissionProfileDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/permission");
              dispatch(actions.removeSelectedProfilePermission());
            }}
          />
        )}
      </Route>
    </PermissionProfileContext.Provider>
  );
}

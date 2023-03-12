import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import UserAdd from "./components/UserAdd/UserAdd";
import UserView from "./components/UserView/UserView";
import UserDelete from "./components/UserDelete/UserDelete";
import User from "./User";

export const UserContext = createContext(null);

export const UserRoute = () => {
  const history = useHistory();
  //   const { actions } = userSlice;
  const dispatch = useDispatch();

  const UIEvents = {
    addUser: () => {
      history.push(`/users/add`);
    },
    openViewUserDialog: (id) => {
      history.push(`/users/${id}/view`);
    },
    deleteUser: (id) => {
      history.push(`/users/${id}/delete`);
    },
  };
  return (
    <UserContext.Provider value={UIEvents}>
      <User />

      <Route path="/users/add">
        {({ history, match }) => (
          <UserAdd
            show={match != null}
            onHide={() => {
              history.push("/users");
            }}
          />
        )}
      </Route>

      <Route path="/users/:id/view">
        {({ history, match }) => (
          <UserView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users");
              //   dispatch(actions.removeSelectedRole());
            }}
          />
        )}
      </Route>

      <Route path="/users/:id/delete">
        {({ history, match }) => (
          <UserDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users");
              //   dispatch(actions.removeSelectedRole());
            }}
          />
        )}
      </Route>
    </UserContext.Provider>
  );
};

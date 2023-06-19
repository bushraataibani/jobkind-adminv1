import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import Notification from "./Notification";
import NotificationAdd from "./components/NotificationAdd/NotificationAdd";
import NotificationView from "./components/NotificationView/NotificationView";
import { NotificationSlice } from "../_redux/Notification/NotificationSlice";

export const NotificationContext = createContext(null);

export default function NotificationRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = NotificationSlice;

  const UIEvents = {
    addNotification: () => {
      history.push(`/notification/add`);
    },
    openViewNotificationDialog: (id) => {
      history.push(`/notification/${id}/view`);
    },
  };

  return (
    <NotificationContext.Provider value={UIEvents}>
      <Notification />

      <Route path="/notification/add">
        {({ history, match }) => (
          <NotificationAdd
            show={match != null}
            onHide={() => {
              history.push("/notification");
            }}
          />
        )}
      </Route>

      <Route path="/notification/:id/view">
        {({ history, match }) => (
          <NotificationView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/notification");
              dispatch(actions.removeSelectedNotification());
            }}
          />
        )}
      </Route>
    </NotificationContext.Provider>
  );
}

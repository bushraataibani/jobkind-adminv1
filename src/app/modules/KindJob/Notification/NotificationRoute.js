import React, { createContext } from "react";
import { Route, useHistory } from "react-router-dom";
import NotificationAdd from "./components/NotificationAdd/NotificationAdd";
import Notification from "./Notification";

export const NotificationContext = createContext(null);

export default function NotificationRoute() {
  const history = useHistory();

  const UIEvents = {
    addNotification: () => {
      history.push(`/notification/add`);
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
    </NotificationContext.Provider>
  );
}

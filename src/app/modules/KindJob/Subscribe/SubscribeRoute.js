import React, { createContext } from "react";
import { useHistory } from "react-router-dom";
import Subscribe from "./Subscribe";

export const SubscribeContext = createContext(null);

export default function SubscribeRoute() {
  const history = useHistory();

  const UIEvents = {
    addSubscribe: () => {
      history.push(`/subscribe/add`);
    },
    openViewSubscribeDialog: (id) => {
      history.push(`/subscribe/${id}/view`);
    },
    deleteSubscribe: (id) => {
      history.push(`/subscribe/${id}/delete`);
    },
  };

  return (
    <SubscribeContext.Provider value={UIEvents}>
      <Subscribe />

      {/* <Route path="/subscribe/add">
        {({ history, match }) => (
          <SubscribeAdd
            show={match != null}
            onHide={() => {
              history.push("/subscribe");
            }}
          />
        )}
      </Route>

      <Route path="/subscribe/:id/view">
        {({ history, match }) => (
          <SubscribeView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/subscribe");
              dispatch(actions.removeSelectedSubscribe());
            }}
          />
        )}
      </Route>

      <Route path="/subscribe/:id/delete">
        {({ history, match }) => (
          <SubscribeDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/subscribe");
              dispatch(actions.removeSelectedSubscribe());
            }}
          />
        )}
      </Route> */}
    </SubscribeContext.Provider>
  );
}

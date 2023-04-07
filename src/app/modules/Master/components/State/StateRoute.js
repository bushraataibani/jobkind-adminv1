import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import State from "./State";
import StateAdd from "./components/StateAdd/StateAdd";
import StateDelete from "./components/StateDelete/StateDelete";
import StateView from "./components/StateView/StateView";
import { StateSlice } from "../../../_redux/State/StateSlice";

export const StateContext = createContext(null);

export default function StateRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = StateSlice;

  const UIEvents = {
    addState: () => {
      history.push(`/master/state/add`);
    },
    openViewStateDialog: (id) => {
      history.push(`/master/state/${id}/view`);
    },
    deleteState: (id) => {
      history.push(`/master/state/${id}/delete`);
    },
  };

  return (
    <StateContext.Provider value={UIEvents}>
      <State />

      <Route path="/master/state/add">
        {({ history, match }) => (
          <StateAdd
            show={match != null}
            onHide={() => {
              history.push("/master/state");
            }}
          />
        )}
      </Route>

      <Route path="/master/state/:id/view">
        {({ history, match }) => (
          <StateView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/state");
              dispatch(actions.removeSelectedState());
            }}
          />
        )}
      </Route>

      <Route path="/master/state/:id/delete">
        {({ history, match }) => (
          <StateDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/state");
              dispatch(actions.removeSelectedState());
            }}
          />
        )}
      </Route>
    </StateContext.Provider>
  );
}

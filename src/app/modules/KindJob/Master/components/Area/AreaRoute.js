import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { AreaSlice } from "../../../_redux/Area/AreaSlice";
import Area from "./Area";
import AreaAdd from "./components/AreaAdd/AreaAdd";
import AreaDelete from "./components/AreaDelete/AreaDelete";
import AreaView from "./components/AreaView/AreaView";

export const AreaContext = createContext(null);

export default function AreaRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = AreaSlice;

  const UIEvents = {
    addArea: () => {
      history.push(`/master/area/add`);
    },
    openViewAreaDialog: (id) => {
      history.push(`/master/area/${id}/view`);
    },
    deleteArea: (id) => {
      history.push(`/master/area/${id}/delete`);
    },
  };

  return (
    <AreaContext.Provider value={UIEvents}>
      <Area />

      <Route path="/master/area/add">
        {({ history, match }) => (
          <AreaAdd
            show={match != null}
            onHide={() => {
              history.push("/master/area");
            }}
          />
        )}
      </Route>

      <Route path="/master/area/:id/view">
        {({ history, match }) => (
          <AreaView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/area");
              dispatch(actions.removeSelectedArea());
            }}
          />
        )}
      </Route>

      <Route path="/master/area/:id/delete">
        {({ history, match }) => (
          <AreaDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/area");
              dispatch(actions.removeSelectedArea());
            }}
          />
        )}
      </Route>
    </AreaContext.Provider>
  );
}

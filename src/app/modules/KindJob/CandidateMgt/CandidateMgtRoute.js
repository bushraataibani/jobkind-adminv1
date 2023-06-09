import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import CandidateMgt from "./CandidateMgt";
import CandidateMgtAdd from "./components/CandidateMgtAdd/CandidateMgtAdd";
import CandidateMgtDelete from "./components/CandidateMgtDelete/CandidateMgtDelete";
import CandidateMgtView from "./components/CandidateMgtView/CandidateMgtView";
import { CandidateMgtSlice } from "../_redux/CandidateMgt/CandidateMgtSlice";

export const CandidateMgtContext = createContext(null);

export default function CandidateMgtRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = CandidateMgtSlice;

  const UIEvents = {
    addCandidateMgt: () => {
      history.push(`/candidate-management/add`);
    },
    openViewCandidateMgtDialog: (id) => {
      history.push(`/candidate-management/${id}/view`);
    },
    deleteCandidateMgt: (id) => {
      history.push(`/candidate-management/${id}/delete`);
    },
  };

  return (
    <CandidateMgtContext.Provider value={UIEvents}>
      <CandidateMgt />

      <Route path="/candidate-management/add">
        {({ history, match }) => (
          <CandidateMgtAdd
            show={match != null}
            onHide={() => {
              history.push("/candidate-management");
            }}
          />
        )}
      </Route>

      <Route path="/candidate-management/:id/view">
        {({ history, match }) => (
          <CandidateMgtView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/candidate-management");
              dispatch(actions.removeSelectedCandidateMgt());
            }}
          />
        )}
      </Route>

      <Route path="/candidate-management/:id/delete">
        {({ history, match }) => (
          <CandidateMgtDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/candidate-management");
              dispatch(actions.removeSelectedCandidateMgt());
            }}
          />
        )}
      </Route>
    </CandidateMgtContext.Provider>
  );
}

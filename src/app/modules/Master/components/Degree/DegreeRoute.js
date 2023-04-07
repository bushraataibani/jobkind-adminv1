import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import Degree from "./Degree";
import DegreeAdd from "./components/DegreeAdd/DegreeAdd";
import DegreeDelete from "./components/DegreeDelete/DegreeDelete";
import DegreeView from "./components/DegreeView/DegreeView";
import { DegreeSlice } from "../../../_redux/Degree/DegreeSlice";

export const DegreeContext = createContext(null);

export default function DegreeRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = DegreeSlice;

  const UIEvents = {
    addDegree: () => {
      history.push(`/master/degree/add`);
    },
    openViewDegreeDialog: (id) => {
      history.push(`/master/degree/${id}/view`);
    },
    deleteDegree: (id) => {
      history.push(`/master/degree/${id}/delete`);
    },
  };

  return (
    <DegreeContext.Provider value={UIEvents}>
      <Degree />

      <Route path="/master/degree/add">
        {({ history, match }) => (
          <DegreeAdd
            show={match != null}
            onHide={() => {
              history.push("/master/degree");
            }}
          />
        )}
      </Route>

      <Route path="/master/degree/:id/view">
        {({ history, match }) => (
          <DegreeView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/degree");
              dispatch(actions.removeSelectedDegree());
            }}
          />
        )}
      </Route>

      <Route path="/master/degree/:id/delete">
        {({ history, match }) => (
          <DegreeDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/degree");
              dispatch(actions.removeSelectedDegree());
            }}
          />
        )}
      </Route>
    </DegreeContext.Provider>
  );
}

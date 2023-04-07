import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import Specialization from "./Specialization";
import SpecializationAdd from "./components/SpecializationAdd/SpecializationAdd";
import SpecializationDelete from "./components/SpecializationDelete/SpecializationDelete";
import SpecializationView from "./components/SpecializationView/SpecializationView";
import { SpecializationSlice } from "../../../_redux/Specialization/SpecializationSlice";

export const SpecializationContext = createContext(null);

export default function SpecializationRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = SpecializationSlice;

  const UIEvents = {
    addSpecialization: () => {
      history.push(`/master/specialization/add`);
    },
    openViewSpecializationDialog: (id) => {
      history.push(`/master/specialization/${id}/view`);
    },
    deleteSpecialization: (id) => {
      history.push(`/master/specialization/${id}/delete`);
    },
  };

  return (
    <SpecializationContext.Provider value={UIEvents}>
      <Specialization />

      <Route path="/master/specialization/add">
        {({ history, match }) => (
          <SpecializationAdd
            show={match != null}
            onHide={() => {
              history.push("/master/specialization");
            }}
          />
        )}
      </Route>

      <Route path="/master/specialization/:id/view">
        {({ history, match }) => (
          <SpecializationView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/specialization");
              dispatch(actions.removeSelectedSpecialization());
            }}
          />
        )}
      </Route>

      <Route path="/master/specialization/:id/delete">
        {({ history, match }) => (
          <SpecializationDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/specialization");
              dispatch(actions.removeSelectedSpecialization());
            }}
          />
        )}
      </Route>
    </SpecializationContext.Provider>
  );
}

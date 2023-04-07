import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import Education from "./Education";
import EducationAdd from "./components/EducationAdd/EducationAdd";
import EducationDelete from "./components/EducationDelete/EducationDelete";
import EducationView from "./components/EducationView/EducationView";
import { EducationSlice } from "../../../_redux/Education/EducationSlice";

export const EducationContext = createContext(null);

export default function EducationRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = EducationSlice;

  const UIEvents = {
    addEducation: () => {
      history.push(`/master/education/add`);
    },
    openViewEducationDialog: (id) => {
      history.push(`/master/education/${id}/view`);
    },
    deleteEducation: (id) => {
      history.push(`/master/education/${id}/delete`);
    },
  };

  return (
    <EducationContext.Provider value={UIEvents}>
      <Education />

      <Route path="/master/education/add">
        {({ history, match }) => (
          <EducationAdd
            show={match != null}
            onHide={() => {
              history.push("/master/education");
            }}
          />
        )}
      </Route>

      <Route path="/master/education/:id/view">
        {({ history, match }) => (
          <EducationView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/education");
              dispatch(actions.removeSelectedEducation());
            }}
          />
        )}
      </Route>

      <Route path="/master/education/:id/delete">
        {({ history, match }) => (
          <EducationDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/education");
              dispatch(actions.removeSelectedEducation());
            }}
          />
        )}
      </Route>
    </EducationContext.Provider>
  );
}

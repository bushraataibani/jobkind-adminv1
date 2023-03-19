import React, { createContext } from "react";
import { Route, useHistory } from "react-router-dom";
import College from "./College";
import CollegeAdd from "./components/CollegeAdd/CollegeAdd";
import CollegeDelete from "./components/CollegeDelete/CollegeDelete";
import CollegeView from "./components/CollegeView/CollegeView";

export const CollegeContext = createContext(null);

export default function CollegeRoute() {
  const history = useHistory();

  const UIEvents = {
    addCollege: () => {
      history.push(`/master/college/add`);
    },
    openViewCollegeDialog: (id) => {
      history.push(`/master/college/${id}/view`);
    },
    deleteCollege: (id) => {
      history.push(`/master/college/${id}/delete`);
    },
  };

  return (
    <CollegeContext.Provider value={UIEvents}>
      <College />

      <Route path="/master/college/add">
        {({ history, match }) => (
          <CollegeAdd
            show={match != null}
            onHide={() => {
              history.push("/master/college");
            }}
          />
        )}
      </Route>

      <Route path="/master/college/:id/view">
        {({ history, match }) => (
          <CollegeView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/college");
              //   dispatch(actions.removeSelectedRole());
            }}
          />
        )}
      </Route>

      <Route path="/master/college/:id/delete">
        {({ history, match }) => (
          <CollegeDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/college");
              //   dispatch(actions.removeSelectedRole());
            }}
          />
        )}
      </Route>
    </CollegeContext.Provider>
  );
}

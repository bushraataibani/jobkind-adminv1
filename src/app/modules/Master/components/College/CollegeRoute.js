import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import College from "./College";
import CollegeAdd from "./components/CollegeAdd/CollegeAdd";
import CollegeDelete from "./components/CollegeDelete/CollegeDelete";
import CollegeView from "./components/CollegeView/CollegeView";

export const CollegeContext = createContext(null);

export const CollegeRoute = () => {
  const history = useHistory();
  //   const { actions } = userSlice;
  const dispatch = useDispatch();

  const UIEvents = {
    addCollege: () => {
      history.push(`/masters/college/add`);
    },
    openViewCollegeDialog: (id) => {
      history.push(`/masters/college/${id}/view`);
    },
    deleteCollege: (id) => {
      history.push(`/masters/college/${id}/delete`);
    },
  };

  return (
    <CollegeContext.Provider value={UIEvents}>
      <College />

      <Route path="/masters/college/add">
        {({ history, match }) => (
          <CollegeAdd
            show={match != null}
            onHide={() => {
              history.push("/masters/college");
            }}
          />
        )}
      </Route>

      <Route path="/masters/college/:id/view">
        {({ history, match }) => (
          <CollegeView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/masters/college");
              //   dispatch(actions.removeSelectedRole());
            }}
          />
        )}
      </Route>

      <Route path="/masters/college/:id/delete">
        {({ history, match }) => (
          <CollegeDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/masters/college");
              //   dispatch(actions.removeSelectedRole());
            }}
          />
        )}
      </Route>
    </CollegeContext.Provider>
  );
};

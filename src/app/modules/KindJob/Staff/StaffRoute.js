import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import Staff from "./Staff";
import StaffAdd from "./components/StaffAdd/StaffAdd";
import StaffDelete from "./components/StaffDelete/StaffDelete";
import StaffView from "./components/StaffView/StaffView";
import { StaffSlice } from "../_redux/Staff/StaffSlice";

export const StaffContext = createContext(null);

export default function StaffRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = StaffSlice;

  const UIEvents = {
    addStaff: () => {
      history.push(`/staff/add`);
    },
    openViewStaffDialog: (id) => {
      history.push(`/staff/${id}/view`);
    },
    deleteStaff: (id) => {
      history.push(`/staff/${id}/delete`);
    },
  };

  return (
    <StaffContext.Provider value={UIEvents}>
      <Staff />

      <Route path="/staff/add">
        {({ history, match }) => (
          <StaffAdd
            show={match != null}
            onHide={() => {
              history.push("/staff");
            }}
          />
        )}
      </Route>

      <Route path="/staff/:id/view">
        {({ history, match }) => (
          <StaffView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/staff");
              dispatch(actions.removeSelectedStaff());
            }}
          />
        )}
      </Route>

      <Route path="/staff/:id/delete">
        {({ history, match }) => (
          <StaffDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/staff");
              dispatch(actions.removeSelectedStaff());
            }}
          />
        )}
      </Route>
    </StaffContext.Provider>
  );
}

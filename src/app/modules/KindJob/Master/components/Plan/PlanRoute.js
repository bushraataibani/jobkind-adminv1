import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import Plan from "./Plan";
import PlanAdd from "./components/PlanAdd/PlanAdd";
import PlanDelete from "./components/PlanDelete/PlanDelete";
import PlanView from "./components/PlanView/PlanView";
import { PlanSlice } from "../../../_redux/Plan/PlanSlice";

export const PlanContext = createContext(null);

export default function PlanRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = PlanSlice;

  const UIEvents = {
    addPlan: () => {
      history.push(`/master/plan/add`);
    },
    openViewPlanDialog: (id) => {
      history.push(`/master/plan/${id}/view`);
    },
    deletePlan: (id) => {
      history.push(`/master/plan/${id}/delete`);
    },
  };

  return (
    <PlanContext.Provider value={UIEvents}>
      <Plan />

      <Route path="/master/plan/add">
        {({ history, match }) => (
          <PlanAdd
            show={match != null}
            onHide={() => {
              history.push("/master/plan");
            }}
          />
        )}
      </Route>

      <Route path="/master/plan/:id/view">
        {({ history, match }) => (
          <PlanView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/plan");
              dispatch(actions.removeSelectedPlan());
            }}
          />
        )}
      </Route>

      <Route path="/master/plan/:id/delete">
        {({ history, match }) => (
          <PlanDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/plan");
              dispatch(actions.removeSelectedPlan());
            }}
          />
        )}
      </Route>
    </PlanContext.Provider>
  );
}

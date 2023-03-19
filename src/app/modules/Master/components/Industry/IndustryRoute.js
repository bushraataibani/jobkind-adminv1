import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { IndustrySlice } from "../../../_redux/Industry/IndustrySlice";
import Industry from "./Industry";
import IndustryAdd from "./components/IndustryAdd/IndustryAdd";
import IndustryDelete from "./components/IndustryDelete/IndustryDelete";
import IndustryView from "./components/IndustryView/IndustryView";

export const IndustryContext = createContext(null);

export default function IndustryRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = IndustrySlice;

  const UIEvents = {
    addIndustry: () => {
      history.push(`/master/industry/add`);
    },
    openViewIndustryDialog: (id) => {
      history.push(`/master/industry/${id}/view`);
    },
    deleteIndustry: (id) => {
      history.push(`/master/industry/${id}/delete`);
    },
  };

  return (
    <IndustryContext.Provider value={UIEvents}>
      <Industry />

      <Route path="/master/industry/add">
        {({ history, match }) => (
          <IndustryAdd
            show={match != null}
            onHide={() => {
              history.push("/master/industry");
            }}
          />
        )}
      </Route>

      <Route path="/master/industry/:id/view">
        {({ history, match }) => (
          <IndustryView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/industry");
              dispatch(actions.removeSelectedIndustry());
            }}
          />
        )}
      </Route>

      <Route path="/master/industry/:id/delete">
        {({ history, match }) => (
          <IndustryDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/industry");
              dispatch(actions.removeSelectedIndustry());
            }}
          />
        )}
      </Route>
    </IndustryContext.Provider>
  );
}

import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import Seo from "./Seo";
import SeoAdd from "./components/SeoAdd/SeoAdd";
import SeoDelete from "./components/SeoDelete/SeoDelete";
import SeoView from "./components/SeoView/SeoView";
import { SeoSlice } from "../_redux/SEO/SeoSlice";

export const SeoContext = createContext(null);

export default function SeoRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = SeoSlice;

  const UIEvents = {
    addSeo: () => {
      history.push(`/seo/add`);
    },
    openViewSeoDialog: (id) => {
      history.push(`/seo/${id}/view`);
    },
    deleteSeo: (id) => {
      history.push(`/seo/${id}/delete`);
    },
  };

  return (
    <SeoContext.Provider value={UIEvents}>
      <Seo />

      <Route path="/seo/add">
        {({ history, match }) => (
          <SeoAdd
            show={match != null}
            onHide={() => {
              history.push("/seo");
            }}
          />
        )}
      </Route>

      <Route path="/seo/:id/view">
        {({ history, match }) => (
          <SeoView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/seo");
              dispatch(actions.removeSelectedSeo());
            }}
          />
        )}
      </Route>

      <Route path="/seo/:id/delete">
        {({ history, match }) => (
          <SeoDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/seo");
              dispatch(actions.removeSelectedSeo());
            }}
          />
        )}
      </Route>
    </SeoContext.Provider>
  );
}

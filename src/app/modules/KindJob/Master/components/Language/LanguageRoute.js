import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { LanguageSlice } from "../../../_redux/Language/LanguageSlice";
import Language from "./Language";
import LanguageAdd from "./components/LanguageAdd/LanguageAdd";
import LanguageDelete from "./components/LanguageDelete/LanguageDelete";
import LanguageView from "./components/LanguageView/LanguageView";

export const LanguageContext = createContext(null);

export default function LanguageRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = LanguageSlice;

  const UIEvents = {
    addLanguage: () => {
      history.push(`/master/language/add`);
    },
    openViewLanguageDialog: (id) => {
      history.push(`/master/language/${id}/view`);
    },
    deleteLanguage: (id) => {
      history.push(`/master/language/${id}/delete`);
    },
  };

  return (
    <LanguageContext.Provider value={UIEvents}>
      <Language />

      <Route path="/master/language/add">
        {({ history, match }) => (
          <LanguageAdd
            show={match != null}
            onHide={() => {
              history.push("/master/language");
            }}
          />
        )}
      </Route>

      <Route path="/master/language/:id/view">
        {({ history, match }) => (
          <LanguageView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/language");
              dispatch(actions.removeSelectedLanguage());
            }}
          />
        )}
      </Route>

      <Route path="/master/language/:id/delete">
        {({ history, match }) => (
          <LanguageDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/language");
              dispatch(actions.removeSelectedLanguage());
            }}
          />
        )}
      </Route>
    </LanguageContext.Provider>
  );
}

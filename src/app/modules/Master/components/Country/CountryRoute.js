import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import Country from "./Country";
import CountryAdd from "./components/CountryAdd/CountryAdd";
import CountryDelete from "./components/CountryDelete/CountryDelete";
import CountryView from "./components/CountryView/CountryView";
import { CountrySlice } from "../../../_redux/Country/CountrySlice";

export const CountryContext = createContext(null);

export default function CountryRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = CountrySlice;

  const UIEvents = {
    addCountry: () => {
      history.push(`/master/country/add`);
    },
    openViewCountryDialog: (id) => {
      history.push(`/master/country/${id}/view`);
    },
    deleteCountry: (id) => {
      history.push(`/master/country/${id}/delete`);
    },
  };

  return (
    <CountryContext.Provider value={UIEvents}>
      <Country />

      <Route path="/master/country/add">
        {({ history, match }) => (
          <CountryAdd
            show={match != null}
            onHide={() => {
              history.push("/master/country");
            }}
          />
        )}
      </Route>

      <Route path="/master/country/:id/view">
        {({ history, match }) => (
          <CountryView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/country");
              dispatch(actions.removeSelectedCountry());
            }}
          />
        )}
      </Route>

      <Route path="/master/country/:id/delete">
        {({ history, match }) => (
          <CountryDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/country");
              dispatch(actions.removeSelectedCountry());
            }}
          />
        )}
      </Route>
    </CountryContext.Provider>
  );
}

import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { CitySlice } from "../../../_redux/City/CitySlice";
import City from "./City";
import CityAdd from "./components/CityAdd/CityAdd";
import CityDelete from "./components/CityDelete/CityDelete";
import CityView from "./components/CityView/CityView";

export const CityContext = createContext(null);

export default function CityRoute() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = CitySlice;

  const UIEvents = {
    addCity: () => {
      history.push(`/master/city/add`);
    },
    openViewCityDialog: (id) => {
      history.push(`/master/city/${id}/view`);
    },
    deleteCity: (id) => {
      history.push(`/master/city/${id}/delete`);
    },
  };

  return (
    <CityContext.Provider value={UIEvents}>
      <City />

      <Route path="/master/city/add">
        {({ history, match }) => (
          <CityAdd
            show={match != null}
            onHide={() => {
              history.push("/master/city");
            }}
          />
        )}
      </Route>

      <Route path="/master/city/:id/view">
        {({ history, match }) => (
          <CityView
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/city");
              dispatch(actions.removeSelectedCity());
            }}
          />
        )}
      </Route>

      <Route path="/master/city/:id/delete">
        {({ history, match }) => (
          <CityDelete
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/master/city");
              dispatch(actions.removeSelectedCity());
            }}
          />
        )}
      </Route>
    </CityContext.Provider>
  );
}

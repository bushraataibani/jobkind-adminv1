import React from "react";
import { Route, Switch } from "react-router-dom";
import { CollegeRoute } from "./components/College/CollegeRoute";

export const MasterRoute = () => {
  return (
    <>
      <Switch>
        <Route exact path="/master/college">
          {({ history, match }) => <CollegeRoute />}
        </Route>
      </Switch>
    </>
  );
};

import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout";
import { customRoutes } from "./BasePageConfig";
import { ErrorPage1 } from "./modules/ErrorsExamples/ErrorPage1";

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }

        {customRoutes().map(
          ({ path, Component, isActive }) =>
            isActive && (
              <ContentRoute path={path} key={path} component={Component} />
            )
        )}

        <Route path="*" component={ErrorPage1} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}

import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout";
import { ErrorPage1 } from "./modules/ErrorsExamples/ErrorPage1";
import { DashboardPage } from "./pages/DashboardPage";

const User = lazy(() => import("./pages/UserPage"));
const Master = lazy(() => import("./pages/MasterPage"));

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
        <ContentRoute path="/dashboard" component={DashboardPage} />

        <Route path="/users" component={User} />
        <Route path="/masters" component={Master} />
        <Route path="*" component={ErrorPage1} />

        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}

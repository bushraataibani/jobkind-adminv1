/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout, LayoutSplashScreen } from "../_metronic/layout";
import AllAlerts from "./AllAlerts";
import BasePage from "./BasePage";
import { AuthPage, Logout } from "./modules/Auth";
import { getUserByToken } from "./modules/Auth/_redux/authCrud";
import { actions } from "./modules/Auth/_redux/authRedux";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";

export function Routes() {
  const { isAuthorized, authToken } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      authToken: auth.authToken,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (authToken)
      getUserByToken()
        .then((res) => {
          dispatch(actions.fulfillUser(res?.data?.data?.user));
        })
        .catch((e) => {
          console.log(e.response);
        })
        .finally(() => {
          setloading(false);
        });
    else setloading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  return (
    <>
      {loading && <LayoutSplashScreen />}

      <Switch>
        {!isAuthorized ? (
          /*Render auth page when user at `/auth` and not authorized.*/
          <Route>
            <AuthPage />
          </Route>
        ) : (
          /*Otherwise redirect to root page (`/`)*/
          <Redirect from="/auth" to="/" />
        )}

        <Route path="/error" component={ErrorsPage} />
        <Route path="/logout" component={Logout} />

        {!isAuthorized ? (
          /*Redirect to `/auth` when user is not authorized*/
          <Redirect to="/auth/login" />
        ) : (
          <Layout>
            <BasePage />
          </Layout>
        )}
      </Switch>
      <AllAlerts />
    </>
  );
}

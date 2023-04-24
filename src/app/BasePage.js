/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout";
import { customRoutes } from "./BasePageConfig";
import { ErrorPage1 } from "./modules/ErrorsExamples/ErrorPage1";
import { shallowEqual, useSelector } from "react-redux";
import { Logout } from "./modules/Auth";

export default function BasePage() {
  const { authToken } = useSelector(
    ({ auth }) => ({
      authToken: auth.authToken,
    }),
    shallowEqual
  );

  const IDLE_TIMEOUT = 3600 * 1000; // 60 minutes in milliseconds
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT);
    };

    const handleMove = () => {
      setIsIdle(false);
      resetTimeout();
    };

    resetTimeout();
    window.addEventListener("load", handleMove);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleMove);
    window.addEventListener("click", handleMove);
    window.addEventListener("scroll", handleMove);
    window.addEventListener("keypress", handleMove);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("load", handleMove);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleMove);
      window.removeEventListener("click", handleMove);
      window.removeEventListener("scroll", handleMove);
      window.removeEventListener("keypress", handleMove);
    };
  }, []);

  return (
    <>
      {isIdle ? (
        <Logout authToken={authToken} />
      ) : (
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
      )}
    </>
  );
}

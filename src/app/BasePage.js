/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useRef } from "react";
import IdleTimer from "react-idle-timer";
import { shallowEqual, useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout";
import { customRoutes } from "./BasePageConfig";
import { ErrorPage1 } from "./modules/ErrorsExamples/ErrorPage1";

export default function BasePage() {
  const history = useHistory();
  const idleTimer = useRef(null);

  const { idleTimeoutInMin, idleTimeInMin } = useSelector(
    ({ auth }) => ({
      idleTimeoutInMin: auth.idleTimeoutInMin,
      idleTimeInMin: auth.idleTimeInMin,
    }),
    shallowEqual
  );

  let timer = null;
  const clearTimeOut = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const handleOnIdle = (event) => {
    timer = setTimeout(() => {
      history.push("/logout");
    }, idleTimeoutInMin * 60 * 1000);
  };

  const handleOnActive = (event) => {
    clearTimeOut();
  };

  const handleOnAction = (event) => {
    clearTimeOut();
  };

  useEffect(() => {
    if (idleTimeInMin && idleTimer.current) {
      idleTimer.current.start();
    }

    return () => {
      if (idleTimeInMin && idleTimer.current) {
        clearTimeOut();
        idleTimer.current.stop();
      }
    };
  }, [idleTimeInMin]);

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      {idleTimeInMin && (
        <IdleTimer
          ref={(ref) => {
            idleTimer.current = ref;
          }}
          timeout={idleTimeInMin * 60 * 1000}
          onIdle={handleOnIdle}
          onActive={handleOnActive}
          onAction={handleOnAction}
          debounce={500}
          startManually={true}
        />
      )}

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

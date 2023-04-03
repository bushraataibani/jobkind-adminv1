/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute } from "../../../../_metronic/layout";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import Login from "./Login";

export function AuthPage(props) {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
          id="kt_login"
          style={{
            justifyContent: "space-between",
          }}
        >
          <div
            className="p-10 p-lg-10"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: 500,
              }}
            >
              Welcome!
            </div>
            <div
              style={{
                backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-2.jpg")})`,
                backgroundPosition: "50%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                margin: "auto 0",
                width: "100%",
                height: "100%",
              }}
            ></div>
          </div>

          <div
            className="login-aside d-flex align-items-center justify-content-center flex-row-auto"
            style={{
              flexDirection: "column",
            }}
          >
            <Switch>
              <ContentRoute path="/auth/login" component={Login} />
              <Redirect from="/auth" exact={true} to="/auth/login" />
              <Redirect to="/auth/login" />
            </Switch>

            <div className="d-flex flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; Kind Jobs 2023
              </div>
            </div>
            <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
              {/* {version} */}
            </div>
          </div>
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}

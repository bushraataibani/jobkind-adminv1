/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { logout } from "../../../_redux/authCrud";
import * as auth from "../../../_redux/authRedux";

const Logout = (props) => {
  const { authToken } = props;
  useEffect(() => {
    logout(authToken).then((res) => {
      console.log(res, "data");
      if (res.data.statusCode === 200) props.logout();
    });
  }, [authToken]);

  return Boolean(authToken) ? (
    <LayoutSplashScreen />
  ) : (
    <Redirect to="/auth/login" />
  );
};

export default connect(
  ({ auth }) => ({ authToken: auth.authToken }),
  auth.actions
)(Logout);

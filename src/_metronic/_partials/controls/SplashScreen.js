import { CircularProgress } from "@mui/material";
import React from "react";
import { toAbsoluteUrl } from "../../_helpers";

export function SplashScreen() {
  return (
    <>
      <div className="splash-screen">
        <img
          src={toAbsoluteUrl("/media/logos/splash-logo.png")}
          alt="Kind Job"
          width="150"
        />
        <CircularProgress className="splash-screen-spinner" />
      </div>
    </>
  );
}

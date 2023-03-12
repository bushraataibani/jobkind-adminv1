import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../../_metronic/layout";
import { MasterRoute } from "../modules/Master/MasterRoute";

export default function MasterPage() {
  return (
    <>
      <Suspense fallback={<LayoutSplashScreen />}>
        <Switch>
          {
            /* Redirect from master root URL to /college */
            <Redirect exact={true} from="/masters" to="/masters/college" />
          }
          <ContentRoute path="/masters/college" component={MasterRoute} />
        </Switch>
      </Suspense>
    </>
  );
}

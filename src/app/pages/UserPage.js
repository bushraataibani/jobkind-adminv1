import React, { Suspense } from "react";
import { LayoutSplashScreen } from "../../_metronic/layout";
import { UserRoute } from "../modules/User/UserRoute";

const UserPage = () => {
  return (
    <>
      <Suspense fallback={<LayoutSplashScreen />}>
        <UserRoute />
      </Suspense>
    </>
  );
};

export default UserPage;

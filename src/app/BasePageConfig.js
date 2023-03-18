import { lazy } from "react";
import UserRoute from "./modules/User/UserRoute";
import { DashboardPage } from "./pages/DashboardPage";

const User = lazy(() =>
  import("./modules/User/UserRoute" /* webpackChunkName: "user" */)
);
const College = lazy(() =>
  import(
    "./modules/Master/components/College/CollegeRoute" /* webpackChunkName: "master>college" */
  )
);

export const customRoutes = () => [
  {
    path: "/dashboard",
    Component: DashboardPage,
    isActive: true,
  },
  {
    path: "/users",
    Component: UserRoute,
    isActive: true,
  },
  {
    path: "/master/college",
    Component: College,
    isActive: true,
  },
];
